const mongoose = require('mongoose')

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/favmovies', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log('Database connect')
    ).catch(err => console.err)
}

module.exports = { connect }