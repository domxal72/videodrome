const fs = require('fs')
const path = require('path')
const Video = require('../models/Video')

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
  // res.status(200).json(
  //   [
  //     {
  //       _id: 1,
  //       title: 'vid 1 from server',
  //       description: 'vid 1 desc',
  //       img: '/img/vid1.jpg'
  //     },
  //     {
  //       _id: 2,
  //       title: 'vid 2',
  //       description: 'vid 2 desc',
  //       img: '/img/vid2.jpg'
  //     },
  //   ],
  // )
}

module.exports = { 
  video_controller,
  get_list
}