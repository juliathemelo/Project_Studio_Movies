const express = require('express')
const mongoose = require('mongoose')
const Movie = require('../models/movie')
const controller = require('../controllers/movieController')

const router = express.Router()

router.get('/', controller.getAllMovies)

router.get('/:id', controller.getById)

router.get('/studio/:name', controller.getByStudio)

router.post('/', controller.createMovie)

router.delete('/:id', controller.deleteMovie)

router.patch('/:id', controller.upgradeMovie)

module.exports = router
