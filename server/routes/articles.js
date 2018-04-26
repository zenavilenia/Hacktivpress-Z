const router = require('express').Router()
const {findAll, findByAuthor, findByCategory, findById, add, addComment, editLike, editDislike, update, remove} = require('../controllers/article.controller')
const multer = require('multer')
const uploadMidleware = require('../middleware/upload')
const {auth} = require('../middleware/auth')

const uploaderMem = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 10 * 1024 * 1024
  }
})

router
    .get('/', findAll)
    .get('/byauthor/:idauthor', findByAuthor)
    .get('/bycategory/:idcategory', findByCategory)
    .get('/:id', findById)
    .post('/', auth, uploaderMem.single('image'),uploadMidleware.upload, add)
    .post('/addcomment', auth, addComment)
    .put('/like/:id', auth, editLike)
    .put('/dislike/:id', auth, editDislike)
    .put('/:id', update)
    .delete('/:id', remove)

module.exports = router