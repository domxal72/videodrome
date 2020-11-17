const jwt = require('jsonwebtoken')
const User = require('../models/User')

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { email: '', password: '' }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already taken'
    return errors
  }

  // validate errors
  if (err.message.includes('user validation failed')){
    // console.log(Object.values(err.errors))
    Object.values(err.errors).forEach(({properties}) => {
      // console.log(properties)
      errors[properties.path] = properties.message
    })
    return errors
  }
}

// Create JWT
const maxAge = 60 * 60 * 24 
const createToken = (id) => {
  return jwt.sign({ id }, 'here goes secret', {
    expiresIn: maxAge
  })
}

const signup_post = async (req, res) => {
  const { email, password } = req.body
  // res.send(email)

  try {
    const user = await User.create({
      email, 
      password
    })
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
    // res.status(400).send('error')
  }
}

const login_get = (req, res) => {
  res.send('login_get')
}

module.exports = {
  signup_post,
  login_get,
}