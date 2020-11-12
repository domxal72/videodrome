const router = require('express').Router()
const authController = require('../controllers/authController')

const { signup_post, login_get } = authController

router.post('/signup', signup_post)
router.get('/login', login_get)

module.exports = authRoutes = router