const express = require('express')
const mongoose = require('mongoose')
const db = require('./data/database')
const studioRoute = require('./routes/studioRoute')
const movieRoute = require('./routes/moiveRoute')
const usuariasRouter = require('./routes/usuarioRoute')

db.connect()

const app = express()

app.use(express.json())

app.use('/studios', studioRoute)
app.use('/movies', movieRoute)
app.use('/usuarias', usuariasRouter)

module.exports = app