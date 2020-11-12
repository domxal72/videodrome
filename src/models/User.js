const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,

  }
})

// tady to co davam jakou string 'user' tak z toho DB automaticky udela users collection jako pomnozny
const User = mongoose.model('user', userSchema)

module.exports = User