


const mongoose = require("mongoose")
const { updateMany } = require("../../../upload-service/src/models/media")


const subscription = new mongoose.Schema({
    userId: String,
    isPremium: {
        type: Boolean,
        default: false
    },
    paymentId: String,
    permiumSince: Date,
    updateAt: {
        type: Date,
        default: Date.now()
    }
})

subscription.pre('save', function (next) {
    this.updateAt = Date.now()
    next()
})

module.exports = mongoose.model("Subscription", subscription)