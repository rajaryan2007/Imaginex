const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadMediaToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            resource_type: "auto"
        }, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
        uploadStream.end(file)
    })

}

const deleteMediaFromCloudinary = async (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
};

module.exports = { uploadMediaToCloudinary, deleteMediaFromCloudinary };
