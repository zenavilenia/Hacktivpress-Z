const Article = require('../models/article.model')
const Comment = require('../models/comment.model')

module.exports = {
  findAll: (req, res) => {
    Article
      .find()
      .populate('author')
      .populate('category')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      })
      .then(response => {
        res.status(200).send({
          message: 'Query all Article success',
          data: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Query all Article failed',
          err: err.message
        })
      })
  },
  findByAuthor: (req, res) => {
    const {idauthor} = req.params
    Article
      .find({
        author: idauthor
      })
      .populate('author')
      .populate('category')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      })
      .then(response => {
        res.status(200).send({
          message: 'Query all Article success',
          data: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Query all Article failed',
          err: err.message
        })
      })
  },
  findByCategory: (req, res) => {
    const {idcategory} = req.params
    Article
      .find({
        category: idcategory
      })
      .populate('author')
      .populate('category')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      })
      .then(response => {
        res.status(200).send({
          message: 'Query all Article success',
          data: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Query all Article failed',
          err: err.message
        })
      })
  },
  findById: (req, res) => {
    const {id} = req.params
    Article.find({
      _id: id
    })
    .then(response => {
      res.status(200).send({
        message: 'Query one Article success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Query one Article failed',
        err: err.message
      })
    })
  },
  add: (req, res) => {
    let userid = req.headers.decoded.id
    const {title, content, category} = req.body

    let newArticle = Article ({
      author: userid, title, content, image: req.imageURL, category
    })

    newArticle.save()
      .then(response => {
        res.status(201).send({
          message: 'Add new Article success',
          data: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Add new Article failed',
          err: err.message
        })
      })
  },
  addComment: (req, res) => {
    let userid = req.headers.decoded.id
    const {id, comment} = req.body
    let newComment = Comment ({
      user: userid,
      comment
    })

    newComment.save()
      .then(response => {
        console.log(response)
        Post.findByIdAndUpdate({
          _id: req.body.id
        }, {
          $push: {
            comments: response._id
          }
        })
          .then(response => {
            res.status(200).send({
              message: 'Add comment to article success',
              data: response
            })
          })
          .catch(err => {
            res.status(400).send({
              message: 'Add comment to article failed',
              err: err.message
            })
          })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Add new answer to post failed',
          err: err.message
        })
      })
  },
  update: (req, res) => {
    const {id} = req.params
    const {title, content, category} = req.body
    Article.findByIdAndUpdate({
      _id: id
    }, {
      title, content, category
    })
      .then(response => {
        res.status(200).send({
          message: 'Update Article success',
          data: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Update Article failed',
          err: err.message
        })
      })
  },
  remove: (req, res) => {
    const {id} = req.params

    Article.findByIdAndRemove({
      _id: id
    })
      .then(response => {
        res.status(200).send({
          message: 'Delete Article success',
          data: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Delete Article failed',
          err: err.message
        })
      })
  }
}