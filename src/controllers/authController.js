const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { secret } = require('../config/jwt_secret')

// Handle errors - funkce na error handling, mozna se tim budu inspirovat pozdeji 
// const handleErrors = (err) => {
//   console.log(err.message, err.code)
//   let errors = { email: '', password: '' }

//   // TODO: jednotnej err pro mail a heslo z bezpecnostnich duvodu, vsak vis 
//   // incorrect email
//   if (err.message === 'wrong email' ) {
//     errors.email = 'users email not found'
//   }
//   // incorrect password
//   if (err.message === 'wrong password' ) {
//     errors.password = 'you have entered wrong password'
//   }

//   // duplicate error code
//   if (err.code === 11000) {
//     errors.email = 'that email is already taken'
//     return errors
//   }

//   // validate errors
//   if (err.message.includes('user validation failed')){
//     // console.log(Object.values(err.errors))
//     Object.values(err.errors).forEach(({properties}) => {
//       // console.log(properties)
//       errors[properties.path] = properties.message
//     })
//     return errors
//   }
// }

// Create JWT
const maxAge = 60 * 60 * 24
const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge
  })
}

const sign_up_user = async (req, res) => {
  const { email, password } = req.body
  // TODO: some validation?
  if (!email || !password) {
    res.status(404).json({ msg: 'enter email and password' })
  }
  try {
    const user = await User.create({
      email,
      password
    })
    const token = createToken(user._id)

    res.status(201).json({
      token,
      id: user._id,
      email: user.email,
    })
  } catch (err) {
    res.status(400).json({ err })
  }
}

const log_in_user = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(404).json({ msg: 'enter email and password' })
  }
  try {
    // In case of user is already logged in
    // await jwt.verify(req.header('x-auth-token'), secret, async (err, decodedToken) => {
    //   if (!err) {
    //     res.status(200).json({ msg: 'You are already logged in' })
    //   }
    // })
    const user = await User.login(email, password)
    let token
    if (user) {
      token = await createToken(user._id)
    }

    res.status(200).json({
      token,
      id: user._id,
      email: user.email,
    })

  } catch (err) {
    res.status(400).json({ err: 'cant log in, invalid credentials' })
  }
}

const get_user_on_app_load = async (req, res) => {
  try {
    console.log(req.user)
    const userByToken = await User.findById(req.user.id)
    console.log(userByToken)
    console.log(userByToken._id)
    res.status(200).json({
      token: req.header('x-auth-token'),
      id: userByToken._id,
      email: userByToken.email,
    })
  } catch (err) {
    res.status(400).json({
      err: 'cant log in, invalid credentials',
    })
  }
}

const log_out_user = async (req, res) => {
  try {
    res.status(200).json({ msg: 'user logged out' })
  } catch (err) {
    res.status(400).json({ msg: 'user log out error:', err })
  }
}

module.exports = {
  sign_up_user,
  log_in_user,
  log_out_user,
  get_user_on_app_load,
}