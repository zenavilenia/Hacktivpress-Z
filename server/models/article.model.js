const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = new Schema ({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: String,
  content: String,
  image: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  sendEmail: {
    type: Boolean
  }
},{
  timestamps: true
})

let post = mongoose.model('post', postSchema)

module.exports = post