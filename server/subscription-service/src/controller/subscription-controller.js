const Subscription = require("../models/subscription")


exports.createSubscription = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            })
        }
        const { paymentId, isPremium } = req.body;

        if (!paymentId) {
            return res.status(400).json({
                success: false,
                message: "Payment ID is required"
            })
        }

        const subscription = new Subscription({
            userId,
            paymentId,
            isPremium
        })

        if (isPremium) {
            subscription.permiumSince = Date.now()
            subscription.permiumEnd = Date.now() + 30 * 24 * 60 * 60 * 1000
        }

        await subscription.save()
        res.status(200).json({
            success: true,
            data: {
                isPremium: subscription.isPremium,
                permiumSince: subscription.permiumSince,
                permiumEnd: subscription.permiumEnd
            }
        })
    } catch (error) {
        console.error("Error creating subscription", error)
        res.status(500).json({
            success: false,
            message: "Failed to create subscription"
        })
    }
}

exports.getSubscription = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            })
        }

        const subscription = await Subscription.findOne({ userId });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            })
        }

        res.status(200).json({
            success: true,
            data: {
                isPremium: subscription.isPremium,
                permiumSince: subscription.permiumSince,
                permiumEnd: subscription.permiumEnd
            }
        })
    } catch (error) {
        console.error("Error getting subscription", error)
        res.status(500).json({
            success: false,
            message: "Failed to get subscription"
        })
    }
}