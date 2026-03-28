const { uploadMediaToCloudinary, deleteMediaFromCloudinary } = require("../utils/cloudinary");
const Media = require("../models/media");


const uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        const { originalname, mimetype, size, width, height } = req.file;
        const { userId } = req.user;

        const cloudinaryResult = await uploadMediaToCloudinary(req.file.buffer);
        const newlyCreatedMeidia = new Media({
            userId: userId,
            name: originalname,
            cloudinaryId: cloudinaryResult.public_id,
            url: cloudinaryResult.secure_url,
            mimeType: mimetype,
            size: size,
            width: width,
            height: height
        })

        await newlyCreatedMeidia.save();

        return res.status(200).json({
            message: "Media uploaded successfully",
            media: newlyCreatedMeidia
        })

    } catch (error) {
        console.error("Error in uploadMedia:", error);
        res.status(500).json({ success: false, message: "Failed to upload media", error: error.message })
    }
}

const getAllMediaByUserId = async (req, res) => {
    try {
        const { userId } = req.user;
        const media = await Media.find({ userId: userId }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, media })
    } catch (error) {
        console.error("Error in getAllMediaByUserId:", error);
        res.status(500).json({ success: false, message: "Failed to get media", error: error.message })
    }
}

const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;

        const media = await Media.findOne({ _id: id, userId });
        
        if (!media) {
            return res.status(404).json({ success: false, message: "Media not found or unauthorized" });
        }

        if (media.cloudinaryId) {
            await deleteMediaFromCloudinary(media.cloudinaryId);
        }
        
        await Media.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Media deleted successfully", id });
    } catch (error) {
        console.error("Error in deleteMedia:", error);
        res.status(500).json({ success: false, message: "Failed to delete media", error: error.message });
    }
}

module.exports = { uploadMedia, getAllMediaByUserId, deleteMedia }