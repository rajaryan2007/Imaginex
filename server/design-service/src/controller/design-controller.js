const Design = require("../models/design")

exports.getUserDesigns = async(req,res)=>{
    try {
        const userId = req.user.id;
        const design= await Design.find({userId}).sort({updateAt:-1});

        return res.status(200).json({
            success:true,
            data:design,
        })
    } catch (error) {
        console.error("Error Fetcting design",error)
        res.status(500).json({
            success:false,
            message:"Failed to fetch designs"
        })
    }
} 

exports.getUserDesignsById = async(req,res)=>{
    try{

    }catch(error){
        console.log("Error fetching designs by id",error);
        res.status(500).json({
            success:false,
            message:"Failed to fetch design"
        })
    }
}

exports.saveDesign = async(req,res)=>{
    try {
        
    } catch (error) {
        console.error("Error saving design",error)
        res.status(500).json({
            success:false,
            message:'Failed to save design'
        })
    }
} 