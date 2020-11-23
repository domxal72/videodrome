const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const videoRoutes = require('./src/routes/videoRoutes')
const authRoutes = require('./src/routes/authRoutes')
const { requireAuth, checkUser } = require('./src/middleware/authMW')

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

// static files for react frontend build
// app.use(express.static(path.join(__dirname, '/frontend/build')))

// middleware to load templates as static or  from file directly
// app.use(express.static(path.join(__dirname, '/src/templates/')))
// app.get('/video', (req, res) => {
//   res.sendFile(path.join(__dirname, '/src/templates/video.html'))
// })

