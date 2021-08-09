const express = require('express')
const mongoose = require('mongoose')
const db = require('./data/database')
const studioRoute = require('./routes/studioRoute')
const movieRoute = require('./routes/moiveRoute')

db.connect()

const app = express()

app.use(express.json())

app.use('/studios', studioRoute)
app.use('/movies', movieRoute)

module.exports = app