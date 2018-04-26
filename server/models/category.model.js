const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name required']
    }
}, {
    timestamps: true
})

const category = mongoose.model('category', categorySchema)

module.exports = category