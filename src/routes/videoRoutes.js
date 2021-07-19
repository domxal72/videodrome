const router = require('express').Router()
const videoController = require('../controllers/videoController')
const { checkUser } = require('../middleware/auth')

const {
  video_controller,
  get_single_video,
  get_single_video_stream,
  get_list,
  video_upload,
} = videoController

router.get('/', video_controller)
// router.get('/list', checkUser, get_list)
router.get('/list', get_list)

// router.get('/:id', checkUser, get_single_video)
router.get('/:id', get_single_video)

router.get('/stream/:id', get_single_video_stream)

// router.post('/video-upload', checkUser, video_upload)
router.post('/video-upload', video_upload)

module.exports = videoRoutes = router