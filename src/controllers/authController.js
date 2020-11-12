const User = require('../models/User')

const signup_post = async (req, res) => {
  const { email, password } = req.body
  // res.send(email)

  try {
    const user = await User.create({
      email, 
      password
    })
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
}

const login_get = (req, res) => {
  res.send('login_get')
}

module.exports = {
  signup_post,
  login_get,
}