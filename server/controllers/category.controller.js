const Category = require('../models/category.model');

module.exports = {
    findAll: (req, res) => {
        Category.find()
          .then(result => {
            res.status(200).send({
              message: 'query category success',
              data: result
            })
          })
          .catch(err => {
            res.status(400).send({
              message: err.message
            })
          })
    },
    addCategory: (req, res) => {
        let category = new Category({
            name: req.body.name
        })
      
        category.save()
            .then(result => {
                res.status(201).send({
                    message: 'add category success',
                    data: result
                })
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message
                })
            })
    },
    update: (req, res) => {
        Category.update({
            _id: req.body.id
        }, {
            name: req.body.name
        })
            .then(result => {
                res.status(200).send({
                    message: 'update category success',
                    data: result
                })
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message
                })
            })
    },
    remove: (req, res) => {
        Category.remove({
            _id: req.body.id
        })
            .then(result => {
                res.status(200).send({
                    message: 'remove category success',
                    data: result
                })
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message
                })
            })
      }

};