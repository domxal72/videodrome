const router = require('express').Router()
const authController = require('../controllers/authController')

const { signup_post, login_post, logout_get, login_get } = authController

router.post('/signup', signup_post)
router.post('/login', login_post)
router.get('/login', login_get)
router.get('/logout', logout_get)

module.exports = authRoutes = router