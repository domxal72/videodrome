const jwt = require('jsonwebtoken')
const { secret } = require('../config/jwt_secret')

// Check user if authenticated
const checkUser = async (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    // console.log(decoded)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).send({ msg: 'invalid token send, not authorized access' })
  }
}

module.exports = {
  checkUser,
}