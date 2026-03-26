
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadMedia, getAllMediaByUserId } = require("../controller/upload-controller");
const authMiddleware = require("../middleware/auth-middleware");
const {GenerateImageFromAiAndUpload} = require("../controller/ai-image-controller");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5
    }
}).single("file");

router.post("/upload", authMiddleware,
    (req, res, next) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: "Failed to upload media" })
            }
            if (err) {
                return res.status(500).json({ success: false, message: "Failed to upload media" })
            }

            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded" })
            }
            next();
        })
    }, uploadMedia
);
router.get("/get", authMiddleware, getAllMediaByUserId);
router.post("/generateImage", authMiddleware, GenerateImageFromAiAndUpload);

module.exports = router;