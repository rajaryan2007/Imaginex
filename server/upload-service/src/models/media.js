const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
    userId: String,
    name: String,
    cloudinaryId: String,
    url: Date,
    mimeType: String,
    size: Number,
    width: Number,
    height: Number,
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Media = mongoose.model("Media", mediaSchema) || mongoose.model.Media;
module.exports = Media;
