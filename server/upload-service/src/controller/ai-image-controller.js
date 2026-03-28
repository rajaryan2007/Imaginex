const axios = require("axios");
const { uploadMediaToCloudinary } = require("../utils/cloudinary");
const Media = require("../models/media");

const GenerateImageFromAiAndUpload = async (req, res) => {
    const prompt = req.body.prompt;
    const width = req.body.width || 1024;
    const height = req.body.height || 1024;
    const userId = req.user?.userId || req.headers['x-user-id'];

    if (!prompt) {
        return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    if (!userId) {
        return res.status(401).json({ success: false, message: "User ID not found" });
    }

    console.log(`[AI Image] Generating image for user: ${userId}, prompt: "${prompt}"`);

    try {
        const imageUrl = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?model=flux&width=${width}&height=${height}&seed=-1`;

        console.log(`[AI Image] Requesting: ${imageUrl}`);

        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            timeout: 120000,
            headers: {
                'Authorization': `Bearer ${process.env["Image_API"] || ''}`
            }
        });

        console.log(`[AI Image] Pollinations responded with status: ${response.status}`);

        const buffer = Buffer.from(response.data, 'binary');

        console.log(`[AI Image] Image buffer size: ${buffer.length} bytes`);

        const cloudinaryResult = await uploadMediaToCloudinary(buffer);

        console.log(`[AI Image] Cloudinary upload complete: ${cloudinaryResult.secure_url}`);

        const newlyCreatedMedia = new Media({
            userId: userId,
            name: `ai-image-${Date.now()}`,
            cloudinaryId: cloudinaryResult.public_id,
            url: cloudinaryResult.secure_url,
            mimeType: response.headers['content-type'] || 'image/jpeg',
            size: buffer.length,
            width: cloudinaryResult.width,
            height: cloudinaryResult.height
        });

        await newlyCreatedMedia.save();

        return res.status(200).json({
            success: true,
            message: "Media uploaded successfully",
            media: newlyCreatedMedia
        });
    } catch (error) {
        console.error("AI image generation error:", error.message || error);
        if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data?.toString?.() || error.response.data);
        }
        return res.status(500).json({
            success: false,
            message: "Failed to generate image",
            error: error.message
        });
    }
}

module.exports = { GenerateImageFromAiAndUpload };
