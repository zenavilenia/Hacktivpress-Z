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

const users = require('./routes/users')
app.use('/users', users)

const articles = require('./routes/articles')
app.use('/articles', articles)

const categories = require('./routes/categories')
app.use('/categories', categories)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server starts on ${port}`)
})

module.exports = app