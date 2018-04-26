const router = require('express').Router()
const {loginFb, login, register} = require('../controllers/user.controller')

router
    .get('/loginFb', loginFb)
    .post('/login', login)
    .post('/register', register)

module.exports = router