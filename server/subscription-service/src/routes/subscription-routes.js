const express = require("express");
const subscriptionController = require("../controller/subscription-controller");
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware");



router.post("/create", authMiddleware, subscriptionController.createSubscription);
router.get("/user", authMiddleware, subscriptionController.getSubscription);

module.exports = router;
