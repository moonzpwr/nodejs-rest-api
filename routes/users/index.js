const express = require('express')
const router = express.Router()
const { reg, login, logout, current, verify, repeatEmailVerify } = require('../../controllers/users')
const { validationRegistration } = require('./valid-users-router.js')
const guard = require('../../helper/guard')



router.post('/signup', validationRegistration, reg)
router.post('/login', validationRegistration, login)
router.post('/logout', guard, logout)
router.get('/current', guard, current)

router.get('/verify/:token', verify)
router.post('/verify', repeatEmailVerify)
module.exports = router
