const express = require('express')

const router = express.Router()

const controller = require("../controllers/studioController")

//GET list all studios

router.get('/', controller.getAllStudio)
router.get('/:id', controller.getStudioById)

//CREATE create a new studio

router.post('/', controller.createStudio)
  
// DELETE delete studio by id

router.delete('/:id', controller.deleteStudio)

// PUT update studio by id

router.patch('/:id', controller.updateStudio)

module.exports = router
