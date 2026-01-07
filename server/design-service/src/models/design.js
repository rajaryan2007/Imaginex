const mongoose = require('mongoose')

const DesignSchema = new mongoose.Schema({
    userId:String,
    name:String,
    canvasData:String,
    width:Number,
    height:Number,
    category:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
        type:Date,
        default:Date.now()
    }
})

const Design = mongoose.model.Design || mongoose.model("Design",DesignSchema);

module.exports = Design;

