const User = require('./../models/userModel')
const controller = require('./baseController')


exports.getAllUsers = controller.getAll(User)
exports.getUser = controller.getOne(User)
exports.updateUser = controller.updateOne(User)
exports.deleteUser = controller.deleteOne(User)

exports.createUser = (req, res) => {
  res.status(400).json({
    status: 'fail',
    message: 'This route is not defined! Please use /signup instead.'
  })
}