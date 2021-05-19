const express = require('express')
const router = express.Router()
const { reg, login, logout, current, updateAvatar } = require('../../controllers/users')
const { validationRegistration } = require('./valid-users-router.js')
const guard = require('../../helper/guard')
const uploadAvatar = require('../../helper/upload-avatar')


router.post('/signup', validationRegistration, reg)
router.post('/login', validationRegistration, login)
router.post('/logout', guard, logout)
router.get('/current', guard, current)
router.patch('/avatars', guard, uploadAvatar.single('avatar'), updateAvatar)
module.exports = router
