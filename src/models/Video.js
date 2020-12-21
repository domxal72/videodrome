const mongoose = require('mongoose')

// first value is value itself, second value in array is error message
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Enter video title']
  },
  description: {
    type: String,
  },
  videoSrc: {
    type: String,
    required: [true, 'Enter your video url'],
    unique: true,
    lowercase: true,
  },
  img: {
    type: String,
  },
},
  { timestamps: true, }
)

const Video = mongoose.model('video', videoSchema)

module.exports = Video