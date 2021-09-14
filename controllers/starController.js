const Star = require('./../models/starModel')
const controller = require('./baseController')


exports.getAllStars = controller.getAll(Star)
exports.getStar = controller.getOne(Star)
exports.createStar = controller.addOne(Star)
exports.updateStar = controller.updateOne(Star)
exports.deleteMovie = controller.deleteOne(Star)