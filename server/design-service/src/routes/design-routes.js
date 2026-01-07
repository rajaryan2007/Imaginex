const express = require('express')
const designController = require('../controller/design-controller')
const authenticationRequest = require('../middleware/auth-middleware')

const router = express.Router()

router.use(authenticationRequest)

router.get('/',designController.getUserDesigns,(req,res)=>{
    console.log("Request reached the route handler!");
})
router.get('/:id',designController.getUserDesignsById)
router.post('/',designController.saveDesign)
router.delete('/:id',designController.deleteDesign)

module.exports = router;




