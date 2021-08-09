const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    studio: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'studio'
    },
    createAt: {
        type: Date,
        required: true,
        default: new Date
    }
})

module.exports = mongoose.model('movie', movieSchema)