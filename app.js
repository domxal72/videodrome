const path = require('path')
const express = require('express')

const videoController = require('./src/api/video/video-controller')

app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('run sally run')
})

app.use('/api/video', videoController)

// static files for react frontend build
app.use(express.static(path.join(__dirname, '/frontend/build')))

// app.use(express.static(path.join(__dirname, '/src/templates/')))

app.get('/', (req, res) => {

})

app.get('/test', (req, res) => {
  res.send({crush: 'your enemies'})
})

app.get('/video', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/templates/video.html'))
})

