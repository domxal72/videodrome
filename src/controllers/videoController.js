const fs = require('fs')
const path = require('path')
const Video = require('../models/Video')
const express = require('express')
const sharp = require('sharp')
// const fileUpload = require('express-fileupload')

// const app = express()

const video_controller = (req, res) => {
  const videoPath = path.join(__dirname, '../assets/videos/castle.mp4')
  const stat = fs.statSync(videoPath)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    const chunksize = (end-start)+1
    const file = fs.createReadStream(videoPath, {start, end})
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
    fs.createReadStream(videoPath).pipe(res)
  }
}

const get_list = async (req, res) => {
  // for file upload, available packages: formidable, express-fileupload, multer
  // for video upload, try: http://mongodb.github.io/node-mongodb-native/2.1/tutorials/gridfs/streaming/
  // for both: https://froala.com/wysiwyg-editor/docs/server/nodejs/video-upload/
  // file upload https://medium.com/@CWMma/how-to-upload-files-with-fetch-to-node-js-without-using-formdata-687e35ba1ab6

  const videoList = await Video.find({})

  res.status(200).json(videoList)
}

const get_single_video = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
    res.status(200).json(video)
  } catch (error) {
    res.status(404).send('single video not found')
  }
}

const crop_test = async (req, res) => {
  try {
    const cropped = await sharp(path.join(__dirname, '../assets/img/', '20210507_112701.jpg' ))
    .extract({ left: 0, top: 0, width: 50, height: 100 })
    .toFile(path.join(__dirname, '../assets/img/', '20210507_1127012.jpg' ))
    // console.log(path.join(__dirname, '../assets/img/', '20210507_112701.jpg' ))

    res.status(200).send(path.join(__dirname, '../assets/img/', '20210507_112701.jpg' ))
  } catch (error) {
    res.status(500).send('crop shit not found')
  }
}

const video_upload = async (req, res) => {
  // enable files upload
  // file upload
  //  TUTORIAL: https://www.youtube.com/watch?v=b6Oe2puTdMQ&ab_channel=TraversyMedia
  // fetch streams https://jakearchibald.com/2016/streams-ftw/
  // TODO: Progress bar - bud pouzit axios nebo zkusit to vyzkoumat nejak s fetch https://javascript.info/fetch-progress

  // console.log(req.files)
  // res.send(req.files)
  // res.send('uploaded')

  if (req.files !== null){
    const { videoTitle, videoDescription } = req.body
    const { videoThumb, videoFile } = req.files

    // const croppedImg = videoThumb
    

    await videoFile.mv(path.join(__dirname, '../assets/videos/', videoFile.name))
    await videoThumb.mv(path.join(__dirname, '../assets/img/', videoThumb.name ))

    // Staci dat Model.create() pro ulozeni do DB
    await Video.create({
      title: videoTitle,
      description: videoDescription,
      img: '/img/' + videoThumb.name,
      videoSrc: '/videos/' + videoFile.name,
    })

    const cropped = await sharp(path.join(__dirname, '../assets/img/', videoThumb.name ))
      .extract({ left: 0, top: 0, width: 50, height: 100 })
      .toFile(path.join(__dirname, '../assets/img/', videoThumb.name ))

    console.log(req.files)
    console.log(videoThumb)
    console.log(req.body)
    res.send(' done')
  } else {

    res.status(500).send('fail')
  }

  // res.send(req.files)
}



module.exports = { 
  video_controller,
  get_single_video,
  get_list,
  video_upload,
  crop_test,
}