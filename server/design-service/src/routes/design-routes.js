const express = require('express')
const designController = require('../controller/design-controller')
const authenticationRequest = require('../middleware/auth-middleware')

const router = express.Router()

router.use(authenticationRequest)

router.get('/',designController.getUserDesigns)
router.get('/:id',designController.getUserDesignsByID)
router.post('/',designController.saveDesign)
router.delete('/:id',designController.deleteDesign)

module.exports = router;




