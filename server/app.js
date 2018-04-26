const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');

require('dotenv').config()

const usermongo = process.env.USERMONGO
const passmongo = process.env.PASSMONGO

mongoose.connect('mongodb://localhost/hacktivpressz');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongoose')
});

const index = require('./routes/index')
app.use('/', index)

const posts = require('./routes/posts')
app.use('/posts', posts)

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server starts on ${port}`)
})

module.exports = app