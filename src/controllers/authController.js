const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { secret } = require('../config/jwt_secret')

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { email: '', password: '' }

  // TODO: jednotnej err pro mail a heslo z bezpecnostnich duvodu, vsak vis 
  // incorrect email
  if (err.message === 'wrong email' ) {
    errors.email = 'users email not found'
  }
  // incorrect password
  if (err.message === 'wrong password' ) {
    errors.password = 'you have entered wrong password'
  }

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
  return jwt.sign({ id }, secret, {
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
    // res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.cookie('jwt', token, {maxAge: maxAge * 1000})
    res.status(201).json({ userID: user._id, email: user.email })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
    // res.status(400).send('error')
  }
}

const login_post = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    // res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.cookie('jwt', token, {httpOnly: false, maxAge: maxAge * 1000})
    res.status(200).json({userID: user._id, email: user.email})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

const logout_get = (req, res) => {
  // bacha kde pouzivam res a kde req s cookie
  res.cookie('jwt', '', { maxAge: 1 })
  console.log('logged out cons')

  // res.redirect('/homepage')
  res.status(200).json({user: 'logged out'})
}

const login_get = (req, res) => {
  res.send('login_get')
}

module.exports = {
  signup_post,
  login_post,
  logout_get,
  login_get,
}