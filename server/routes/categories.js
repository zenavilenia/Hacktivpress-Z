const router = require('express').Router()
const {findAll, addCategory, update, remove} = require('../controllers/category.controller')
const {auth} = require('../middleware/auth')

router
    .get('/', findAll)
    .post('/', addCategory)
    .put('/', update)
    .delete('/', remove)

module.exports = router