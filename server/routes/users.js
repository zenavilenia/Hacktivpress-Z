const router = require('express').Router()
const {findAll, findById, update, remove} = require('../controllers/user.controller')
const {auth} = require('../middleware/auth')

router
    .get('/', findAll)
    .get('/:id', findById)
    .put('/:id', update)
    .delete('/:id', remove)

module.exports = router