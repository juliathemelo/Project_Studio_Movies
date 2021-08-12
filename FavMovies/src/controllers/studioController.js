const Studio = require('../models/studio')
const mongoose = require('mongoose')

const getAllStudio = async (req, res) => {
    const studios = await Studio.find()
    res.json(studios)
}

const getStudioById = async (req,res) => {
    const requestId = req.params.id
    const StudiosById = await Studio.findOne({ _id: requestId })
    res.json(StudiosById)
}

const createStudio = async (req,res) => {
    const studios = new Studio({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      createAt: req.body.createAt
    })

    const allStudiosValidation = await Studio.findOne({ name: req.body.name })
    
    if (allStudiosValidation) {
        res.status(409).json({error: `Studio ${req.body.name} is already registered`})
    } else {
        try{
            const newStudio = await studios.save()
            res.status(201).json(newStudio)
        } catch(err){
            res.status(400).json({ message: err.message })
        }
    }
}

const deleteStudio = async (req,res) => {
    const requestId = req.params.id

    const StudiosValidation = await Studio.findOne({ _id: requestId })
    
    if (!StudiosValidation) {
        res.status(409).json({error: `Studio does not exist`})
    } else { 
        try{
            Studio.remove({ _id: requestId }, function(err) {
                if (!err) {
                    res.status(200).json({ message: "Successfully deleted :3"})
                }
                else {
                    res.status(400).json({ message: err.message })
                }
            })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}

const updateStudio = async (req,res) => {
    try {
        const studio = await Studio.findById(req.params.id)

        if (studio == null) {
          return res.status(404).json({message: "studio not found"})
        }

        if (req.body.name != null) {
            studio.name = req.body.name
        }

        const studioAtualizado = await studio.save()
        res.status(200).json(studioAtualizado)
    
      } catch (err) {
        res.status(500).json({message: err.message})
      }
    }

module.exports = {
    getAllStudio,
    getStudioById,
    createStudio,
    deleteStudio,
    updateStudio
}