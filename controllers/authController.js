const { error } = require('console')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { mainModule } = require('process')
const User = require('./../models/userModel')


// const signToken = id => {
//   return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
// }

const createAndSendToken = (user, statusCode, res) => {
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
  
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN),
    httpOnly: true
  }
  if(process.env.NODE_ENV === 'production') cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions)

  // Removes the password from the output
  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  })
}

exports.signup = async(req, res) => {
  try{
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      photo: req.body.photo,
      role: req.body.role,
      watchList: req.body.watchList,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    })

    createAndSendToken(newUser, 201, res)

  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

exports.login = async(req, res) => {
  try{
    const { email, password } = req.body
    if(!email || !password) throw error("Please provide email and password")
    const user = await User.findOne({ email }).select('+password')
    if(!user || !(await user.correctPassword(password, user.password)))
      throw error("Incorrecr email or pasword")
  
    createAndSendToken(user, 200, res)
  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}