const Design = require("../models/design")

exports.getUserDesigns = async (req, res) => {
    try {
        const userId = req.user.id;
        const design = await Design.find({ userId }).sort({ updateAt: -1 });

        return res.status(200).json({
            success: true,
            data: design,
        })
    } catch (error) {
        console.error("Error Fetcting design", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch designs"
        })
    }
}

exports.getUserDesignsById = async (req, res) => {
    try {
        const userId = req.user.userId;
        const designId = req.params.id;

        const design = await Design.findOne({ _id: designId, userId })

        if (!design) {
            return res.status(404).json({
                success: false,
                message: "design not found or you don't have permission to view it"
            })
        }

        res.status(200).json({
            success: true,
            data: design,
        });
    } catch (error) {
        console.log("Error fetching designs by id", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch design"
        })
    }
}

exports.saveDesign = async (req, res) => {
    try {
        const userId = req.user.userId;

        const { designId, name, canvasData, width, height, category } = req.body;

        if (designId) {
            const design = await Design.findOne({ _id: designId, userId })
            if (!design) {
                return res.status(404).json({
                    success: false,
                    message: "Design not found! or you don't have permission to view it"
                })
            }

            if (name) design.name = name
            if (canvasData) design.canvasData = canvasData
            if (width) design.width = width
            if (height) design.height = height
            if (category) design.category = category

            design.updateAt = Date.now()
            const updatedDesign = await design.save()

            return res.status(200).json({
                success: true,
                data: updatedDesign
            })
        } else {
            const newDesign = newDesign({
                userId,
                name: name || 'Utitled Design',
                width,
                height,
                canvasData,
                category
            })

            const saveDesign = await newDesign.save()
            return res.status(200).json({
                success: true,
                data: saveDesign
            })
        }


    } catch (error) {
        console.error("Error saving design", error)
        res.status(500).json({
            success: false,
            message: 'Failed to save design'
        })
    }
}

exports.deleteDesign = async(req,res)=>{
    
    try{
            const userId = req.user.userId;
            const designId = req.params.id;

    await Design.deleteOne({_id:designId}) 
    
    res.status(200).json({
        success:true,
        message:"Design delete successfully"
    })
    



    }catch(error){
        console.error("some error while deleting the product",error);
        res.status(500).json({
            success:false,
            message:'failed to delete the design'
        })
        
    }    


}

