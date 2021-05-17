const path = require('path')

const express = require('express')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const { PORT } = require('./src/config/env')
const videoRoutes = require('./src/routes/videoRoutes')
const authRoutes = require('./src/routes/authRoutes')
const { requireAuth, checkUser } = require('./src/middleware/authMW')
const Video = require('./src/models/Video')

app = express()

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

// file upload middleware
app.use(fileUpload())

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

