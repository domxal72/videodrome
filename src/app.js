const express = require('express')

app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('run sally run')
})