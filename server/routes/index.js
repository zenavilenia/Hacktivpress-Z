const router = require('express').Router()
const {login, register} = require('../controllers/user.controller')

router
    .post('/login', login)
    .post('/register', register)

module.exports = router