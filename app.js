const path = require('path')

const express = require('express')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const videoRoutes = require('./src/routes/videoRoutes')
const authRoutes = require('./src/routes/authRoutes')
const { requireAuth, checkUser } = require('./src/middleware/authMW')
const Video = require('./src/models/Video')

app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('run sally run')
})


// Rid off deprecation warning
mongoose.set('useCreateIndex', true);
// DB connection
const dbName = 'videodrome_db'
const userName = 'dom'
const userPass = 'tetrev236'
const dbURI = `mongodb+srv://${userName}:${userPass}@videodrome-cluster.j65vd.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

// static files for react frontend build
app.use(express.static(path.join(__dirname, '/frontend/build')))
// to load files from multiple different directories, just use static method multiple times
app.use(express.static(path.join(__dirname, '/src/assets/')))
// app.use(express.static(path.join(__dirname, '/src/templates/')))
// app.get('/video', (req, res) => {
//   res.sendFile(path.join(__dirname, '/src/templates/video.html'))
// })

// Strasne zalezi v jakym poradi jsou ty middleware
// Treba vsechny funkce, routy a dalsi middleware kde pouzivam cookieParser tak ten musi bejt pred nima
app.use(express.json())
app.use(cookieParser())

app.get('*', checkUser) // check user on every request

app.use('/video', videoRoutes)
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('requesting backup')
})

app.get('/protected', requireAuth, (req, res) => {
  res.send('protected')
})

app.get('/test', (req, res) => {
  res.send({crush: 'your enemies'})
})

app.get('/denied', (req, res) => {
  res.send({access: 'denied'})
})

// enable files upload
app.use(fileUpload());

// file upload
//  TUTORIAL: https://www.youtube.com/watch?v=b6Oe2puTdMQ&ab_channel=TraversyMedia
// fetch streams https://jakearchibald.com/2016/streams-ftw/
// TODO: Progress bar - bud pouzit axios nebo zkusit to vyzkoumat nejak s fetch https://javascript.info/fetch-progress
app.post('/video-upload', async (req, res) => {

  if (req.files !== null){
    const { videoTitle, videoDescription } = req.body
    const { videoThumb, videoFile } = req.files

    videoFile.mv( __dirname + '/src/assets/videos/' + videoFile.name )
    videoThumb.mv( __dirname + '/src/assets/img/' + videoThumb.name )

    // Staci dat Model.create() pro ulozeni do DB
    const video = await Video.create({
      title: videoTitle,
      description: videoDescription,
      img: '/img/' + videoThumb.name,
      videoSrc: '/videos/' + videoFile.name,
    })

    console.log(req.files)
    console.log(req.body)
    res.send(' done')
  } else {

    res.status(500).send('fail')
  }

  // res.send(req.files)
})

