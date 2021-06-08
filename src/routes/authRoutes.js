const router = require('express').Router()
const authController = require('../controllers/authController')
const { checkUser } = require('../middleware/auth')

const { sign_up_user, log_in_user, get_user_on_app_load, log_out_user } = authController

router.post('/signup', sign_up_user)
router.post('/login', log_in_user)
router.get('/get-user', checkUser, get_user_on_app_load)
router.get('/logout', checkUser, log_out_user)

module.exports = authRoutes = router