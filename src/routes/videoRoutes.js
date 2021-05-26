const router = require('express').Router()
const videoController = require('../controllers/videoController')

const {
  video_controller,
  get_single_video,
  get_list,
  video_upload,
  fetch_test,
} = videoController

router.get('/', video_controller)
router.get('/list', get_list)
router.get('/fetch-test', fetch_test)

router.get('/:id', get_single_video)

router.post('/video-upload', video_upload)

module.exports = videoRoutes = router