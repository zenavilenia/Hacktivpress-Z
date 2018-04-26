const Comment = require('../models/comment.model')

module.exports = {
  editLike: (req, res) => {
    let {id} = req.params
    let userid = req.headers.decoded.id
    let action = '';

    Comment
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
          
          Comment.update({
            _id:id
          }, {
            [action]: {
              likes: userid
            }
          }, {
            overwrite: false
          }, function (err, comment) {
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

    Comment
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
          
          Comment.update({
            _id:id
          }, {
            [action]: {
              dislikes: userid
            }
          }, {
            overwrite: false
          }, function (err, comment) {
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
    const {comment} = req.body
    Comment.findByIdAndUpdate({
      _id: id
    }, {
      comment
    })
    .then(response => {
      res.status(200).send({
        message: 'Update Comment success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Update Comment failed',
        err: err.message
      })
    })
  },
  remove: (req, res) => {
    const {id} = req.params

    Comment.findByIdAndRemove({
      _id: id
    })
      .then(response => {
        res.status(200).send({
          message: 'Delete Comment success',
          data: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Delete Comment failed',
          err: err.message
        })
      })
  }
}