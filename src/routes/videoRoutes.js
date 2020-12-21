const router = require('express').Router()
const videoController = require('../controllers/videoController')

const { video_controller, get_list } = videoController

router.get('/', video_controller)
router.get('/list', get_list)

module.exports = videoRoutes = router