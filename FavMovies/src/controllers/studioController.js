const Studio = require('../models/studio')
const mongoose = require('mongoose')

const getAllStudio = async (req, res) => {
    const studios = await Studio.find()
    res.json(studios)
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
                    res.status(200).json({ message: "Deletado com sucesso"})
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
    const requestId = req.params.id

    const studios = new Studio({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      createAt: req.body.createAt
    })

    try{
        const newStudio = await studios.save({ _id: requestId })
        res.status(201).json(newStudio)
    } catch(err){
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    getAllStudio, 
    createStudio,
    deleteStudio,
    updateStudio
}