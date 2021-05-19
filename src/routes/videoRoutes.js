const router = require('express').Router()
const videoController = require('../controllers/videoController')
const fileUpload = require('express-fileupload')

const {
  video_controller,
  get_single_video,
  get_list,
  video_upload,
  crop_test,
} = videoController

router.get('/', video_controller)
router.get('/list', get_list)
router.get('/crop', crop_test)
router.get('/:id', get_single_video)
// router.get('/video-upload', fileUpload, video_upload)

// router.use(fileUpload())
router.post('/video-upload', video_upload)

module.exports = videoRoutes = router