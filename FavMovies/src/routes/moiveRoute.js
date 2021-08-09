const express = require('express')
const mongoose = require('mongoose')
const Movie = require('../models/movie')

const router = express.Router()

router.get('/', async (req, res) => {
    const movies = await Movie.find().populate('studio')
    res.json(movies)
})

router.post('/', async (req, res) => {
    const movie = new Movie({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      gender: req.body.gender,
      description: req.body.description,
      studio: req.body.studio,
      createAt: req.body.createAt
    })
    const allMovieValidation = await Movie.findOne({ name: req.body.name })
    if (allMovieValidation) {
        res.status(409).json({error: `Movie ${req.body.name} is already registered`})
    } else {
        try {
            const newMovie = await movie.save()
            res.status(201).json(newMovie)
          } catch (err) {
            res.status(400).json({ message: err.message})
          }  
    }
  })

module.exports = router
