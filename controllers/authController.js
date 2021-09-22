const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const User = require('./../models/userModel')
const Review = require('./../models/reviewModel')


// const signToken = id => {
//   return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
// }

const createAndSendToken = (user, statusCode, res) => {
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
  
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
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
    if(!email || !password) throw new Error("Please provide email and password")
    const user = await User.findOne({ email })
    if(!user || !(await user.correctPassword(password, user.password)))
      throw new Error("Incorrecr email or pasword")

    createAndSendToken(user, 200, res)
    
  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

exports.protect = async(req, res, next) => {
  try{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    // }else if(req.cookies.jwt) {
    //   token = req.cookies.jwt
    }
    if(!token) throw new Error('You are not logged in! Please log in to get access')

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if(!currentUser) 
      throw new Error('The user belonging to this token no longer exists!')

    // 4) Check if user changed password after the token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)) 
      throw new Error('User recently changed password! Please log in again')

    req.user = currentUser
    next()

  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

exports.allowAccess = (...roles) => {
  return (req, res, next) => {
    try{
      if(!roles.includes(req.user.role))
        throw new Error('You do not have permission to perform this action!')

      next()

    }catch(err){
      res.status(400).json({
        status: 'fail',
        message: err.message
      })
    }
  }
}

exports.correctUser = async(req, res, next) => {
  try{
    const review = await Review.findById(req.params.id)
    
    if(req.user.id != review.user._id)
      throw new Error('This review does not belong to you!')
    
    next()

  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}