const { createReadStream, statSync } = require('fs')
const path = require('path')
const sharp = require('sharp')

const Video = require('../models/Video')
const User = require('../models/User')
const logger = require('../log/logger')

const video_controller = (req, res) => {
  const videoPath = path.join(__dirname, '../assets/videos/castle.mp4')
  const stat = statSync(videoPath)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    let [start, end] = range.replace(/bytes=/, "").split("-")
    start = parseInt(start, 10)
    end = end ? parseInt(end, 10) : fileSize - 1
    const chunksize = (end - start) + 1
    const file = createReadStream(videoPath, { start, end })
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    createReadStream(videoPath).pipe(res)
  }
}

const get_list = async (req, res) => {
  // for file upload, available packages: formidable, express-fileupload, multer
  // for video upload, try: http://mongodb.github.io/node-mongodb-native/2.1/tutorials/gridfs/streaming/
  // for both: https://froala.com/wysiwyg-editor/docs/server/nodejs/video-upload/
  // file upload https://medium.com/@CWMma/how-to-upload-files-with-fetch-to-node-js-without-using-formdata-687e35ba1ab6

  try {
    const videoList = await Video.find({})
    res.status(200).json(videoList)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}

const get_single_video = async (req, res) => {
  try {
    console.log(req.params.id)
    const video = await Video.findById(req.params.id)
    res.status(200).json(video)
  } catch (error) {
    res.status(404).send({ msg: 'single video not found' })
  }
}

const get_single_video_stream = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
    const videoPath = path.join(__dirname, `../assets${video.videoSrc}`)
    const stat = statSync(videoPath)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
      let [start, end] = range.replace(/bytes=/, "").split("-")
      start = parseInt(start, 10)
      end = end ? parseInt(end, 10) : fileSize - 1
      const chunksize = (end - start) + 1
      const file = createReadStream(videoPath, { start, end })
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }

      res.writeHead(206, head)
      file.pipe(res)
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      createReadStream(videoPath).pipe(res)
    }
  } catch (error) {
    res.status(404).send({ msg: 'single video not found' })
  }
}

const video_upload = async (req, res) => {
  // enable files upload from middleware in app.js
  //  TUTORIAL: https://www.youtube.com/watch?v=b6Oe2puTdMQ&ab_channel=TraversyMedia
  // fetch streams https://jakearchibald.com/2016/streams-ftw/
  // TODO: Progress bar - bud pouzit axios nebo zkusit to vyzkoumat nejak s fetch https://javascript.info/fetch-progress
  console.log(req.user)
  const userVerify = await User.findById(req.user.id)

  try {

    if (userVerify.role !== 'admin') {
      return res.status(401).send({ msg: 'You must be admin to upload a video' })
    }

    const { videoTitle, videoDescription } = req.body
    const { videoThumb = undefined, videoFile = undefined } = req.files

    await videoFile.mv(path.join(__dirname, '../assets/videos/', videoFile.name))
    // Move image to temporary location for resize
    await videoThumb.mv(path.join(__dirname, '../assets/temp_img/', videoThumb.name))

    // Staci dat Model.create() pro ulozeni do DB
    await Video.create({
      title: videoTitle,
      description: videoDescription,
      img: '/img/' + videoThumb.name,
      videoSrc: '/videos/' + videoFile.name,
    })

    // Resize uploaded image from temporary location and save it to named address
    await sharp(path.join(__dirname, '../assets/temp_img/', videoThumb.name))
      .resize({ width: 500, height: 300 })
      .toFile(path.join(__dirname, '../assets/img/', videoThumb.name))

    res.status(200).send({ msg: 'video uploaded successfully' })
  } catch (error) {
    res.status(500).send({ msg: 'fail' })
  }
}

module.exports = {
  video_controller,
  get_single_video,
  get_single_video_stream,
  get_list,
  video_upload,
}