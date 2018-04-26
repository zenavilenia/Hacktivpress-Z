const router = require('express').Router()
const {findAll, addCategory, update, remove} = require('../controllers/category.controller')
const {auth} = require('../middleware/auth')

router
    .get('/', auth, findAll)
    .post('/', auth, addCategory)
    .put('/', auth, update)
    .delete('/', auth, remove)

module.exports = router