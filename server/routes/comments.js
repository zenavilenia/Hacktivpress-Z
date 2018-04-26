const router = require('express').Router()
const {editLike, editDislike, update, remove} = require('../controllers/comment.controller')
const {auth} = require('../middleware/auth')

router
    .put('/like/:id', auth, editLike)
    .put('/dislike/:id', auth, editDislike)
    .put('/:id', auth, update)
    .delete('/:id', auth, remove)

module.exports = router