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
        Article.findByIdAndUpdate({
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
  editLike: (req, res) => {
    let {id} = req.params
    let userid = req.headers.decoded.id
    let action = '';

    Article
      .find({
        _id: id
      })
      .exec()
      .then(response => {
        let likes = response[0].likes;
        let adaLike = likes.indexOf(userid);
        let dislikes = response[0].dislikes;
        let adaDisike = dislikes.indexOf(userid);
        
        if(adaDisike != -1) {
          res.status(400).send({
            message: 'Sudah ada dislike'
          })
        } else {
          if (adaLike != -1) {
            action = '$pull'
          } else {
            action = '$push'
          }
          
          Article.update({
            _id:id
          }, {
            [action]: {
              likes: userid
            }
          }, {
            overwrite: false
          }, function (err, article) {
            if(!err) {
              res.status(200).send({
                message: 'edit like success'
              })
            } else {
              res.status(400).send({
                message: 'edit like failed'
              })
            }
          })
        }
      })
      .catch(err => {
        res.status(400).send({
          message: err
        })
      })
  },
  editDislike: (req, res) => {
    let {id} = req.params
    let userid = req.headers.decoded.id
    let action = '';

    Article
      .find({
        _id: id
      })
      .exec()
      .then(response => {
        let likes = response[0].likes;
        let adaLike = likes.indexOf(userid);
        let dislikes = response[0].dislikes;
        let adaDisike = dislikes.indexOf(userid);
        
        if(adaLike != -1) {
          res.status(400).send({
            message: 'Sudah ada like'
          })
        } else {
          if (adaDisike != -1) {
            action = '$pull'
          } else {
            action = '$push'
          }
          
          Article.update({
            _id:id
          }, {
            [action]: {
              dislikes: userid
            }
          }, {
            overwrite: false
          }, function (err, article) {
            if(!err) {
              res.status(200).send({
                message: 'edit dislike success'
              })
            } else {
              res.status(400).send({
                message: 'edit dislike failed'
              })
            }
          })
        }
      })
      .catch(err => {
        res.status(400).send({
          message: err
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