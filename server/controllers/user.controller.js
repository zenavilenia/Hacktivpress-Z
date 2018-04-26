const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports = {
  login: (req, res) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({
      email
    }, (err, user) => {
      if(err) {
        res.status(400).send({
          message: err.message
        })
      } else {
        bcrypt.compare(password, user.password, function(err, res2) {
          if(err) {
            res.status(400).send({
              message: err.message
            })
          } else {
            if(res2) {
              let token = jwt.sign(
              {
                id: user._id,
                email: user.email
              },
              process.env.SECRET)
              res.status(200).json({
                message: "login success",
                token: token,
                user: user
              })
            } else {
              res.status(500).json({
                message: "login failed"
              })
            }
          }
        });
      }
    })
  },
  register: (req, res) => {
      let email = req.body.email
      let password = req.body.password
      bcrypt.hash(password, 10, function(err, hash) {
          if(err) {
              res.status(500).json({
                  message: err
              })
          } else {
              password = hash;
              let user = new User({
                  email, password
              })

              user.save((err, result) => {
                  if(err) {
                      res.status(400).send({
                          message: err.message
                      })
                  } else {
                      res.status(201).send({
                          message: 'sign up success',
                          data: result
                      })
                  }
              })
          }
      });
  },
  loginFb: (req, res) => {
    let token = req.headers.fb_access_token
      FB.setAccessToken(token);
      FB.api('/me', {fields: ['email']}, function(response) {
          let {email} = response
          let password = email
          
          User.findOne({
              email
          }, function(err, info){
              if(!info) {
                bcrypt.hash(password, 10, function(err, hash) {
                  if(err) {
                      res.status(500).json({
                          message: err
                      })
                  } else {
                      password = hash;
                      let newUser = new User({
                          email, password
                      })
                      newUser.save((err, result) => {
                          if(err) {
                              res.status(400).send({
                                  message: err.message
                              })
                          } else {
                              let token = jwt.sign({
                                id: result._id,
                                email: result.email
                              }, process.env.SECRET)
                              res.status(201).send({
                                  message: 'sign up success',
                                  data: result,
                                  token: token
                              })
                          }
                      })
                  }
                });
              } else {
                let token = jwt.sign(
                  {
                    id: info._id,
                    email: info.email
                  }, process.env.SECRET)
                  res.status(200).json({
                  message: "success login",
                  token: token,
                  id: info._id
                  })
              }
          })
      })
  }
}