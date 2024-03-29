const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { secret } = require('../config/jwt_secret')

// Create JWT
const maxAge = 60 * 60 * 24
const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge
  })
}

const sign_up_user = async (req, res) => {
  const { email, password } = req.body
  // TODO: validation?
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
      role: userByToken.role,
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
      role: user.role,
    })

  } catch (err) {
    res.status(400).json({ err: 'cant log in, invalid credentials' })
  }
}

const get_user_on_app_load = async (req, res) => {
  try {
    console.log(req.user)
    const userByToken = await User.findById(req.user.id)
    res.status(200).json({
      token: req.header('x-auth-token'),
      id: userByToken._id,
      email: userByToken.email,
      role: userByToken.role,
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