const Movie = require('./../models/movieModel')
const controller = require('./baseController')


exports.getAllMovies = controller.getAll(Movie)
exports.getMovie = controller.getOne(Movie, {path: 'reviews'})
exports.createMovie = controller.addOne(Movie)
exports.updateMovie = controller.updateOne(Movie)
exports.deleteMovie = controller.deleteOne(Movie)