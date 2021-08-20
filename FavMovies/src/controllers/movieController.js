const mongoose = require('mongoose')
const Movie = require('../models/movie')
const Studio = require('../models/studio')

const getAllMovies = async (req, res) => {
    const authHeader = req.get('authorization');
    const token = authHeader.split(' ')[1]
  
    if (!token) {
      return res.status(403).send({message: "Kd a tokenzinnn"})
    }
    jwt.verify(token, process.env.SECRET, async (err) => {
      if (err) {
        res.status(403).send({ message: 'Token não válido', err})
      }
        const movies = await Movie.find().populate('studio')
        res.json(movies)
    })
}

const getById = async (req, res) => {
    const authHeader = req.get('authorization');
    const token = authHeader.split(' ')[1]
  
    if (!token) {
      return res.status(403).send({message: "Kd a tokenzinnn"})
    }
    jwt.verify(token, process.env.SECRET, async (err) => {
      if (err) {
        res.status(403).send({ message: 'Token não válido', err})
      }
        const requestId = req.params.id
        const movies = await Movie.findOne({ _id: requestId }).populate('studio')
        res.json(movies)
    })
}

const getByStudio = async (req, res) => {
    const requestName = req.params.name
    const studioid = await Studio.findOne({ name: requestName })
    
    if (studioid != null) {
        const movie = await Movie.find({ studio: studioid.id })
        res.json(movie)
    }
}

const createMovie = async (req, res) => {
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
}

const deleteMovie = async (req, res) => {
    const requestId = req.params.id

    const StudioValidation = Movie.findOne({ _id: requestId })

    if (!StudioValidation) {
        res.status(409).send({ message: `Studio does not exist `})
    } else {
        try{
            Movie.remove({ _id: requestId }, function(err){
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

const upgradeMovie = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id)

        if (movie == null) {
            return res.status(404).json({message: "movie not found"})
        }

        if (req.body != null) {
            movie.name = req.body.name
        }

        const upgradeMovie = await movie.save()
        res.status(200).send(upgradeMovie)

    } catch(err) {
        res.status(500).json({message: err.message})
    }   
}

module.exports = {
    getAllMovies,
    getById,
    getByStudio,
    createMovie,
    deleteMovie,
    upgradeMovie
}