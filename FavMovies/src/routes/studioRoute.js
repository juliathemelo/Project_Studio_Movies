const express = require('express')

const router = express.Router()

const controller = require("../controllers/studioController")

//GET list all studios

router.get('/', controller.getAllStudio)

//CREATE create a new studio

router.post('/', controller.createStudio)
  
// DELETE delete studio by id

router.delete('/:id', controller.deleteStudio)

// PUT update studio by id

router.put('/:id', controller.updateStudio)

module.exports = router
