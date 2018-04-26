const router = require('express').Router()
const {findAll, findByAuthor, findByCategory, findById, add, addComment, editLike, editDislike, update, remove} = require('../controllers/article.controller')
const {auth} = require('../middleware/auth')

router
    .get('/', findAll)
    .get('/byauthor/:idauthor', findByAuthor)
    .get('/bycategory/:idcategory', findByCategory)
    .get('/:id', findById)
    .post('/', auth, add)
    .post('/addcomment', auth, addComment)
    .put('/like/:id', auth, editLike)
    .put('/dislike/:id', auth, editDislike)
    .put('/:id', update)
    .delete('/:id', remove)

module.exports = router