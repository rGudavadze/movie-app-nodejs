const Review = require('./../models/reviewModel')
const controller = require('./baseController')


// allow nested routes
exports.setMovieUserIds = (req, res, next) => {
  if(!req.body.movie) req.body.movie = req.params.movieId
  if(!req.body.user) req.body.user = req.user.id
  next()
}


exports.getAllReviews = controller.getAll(Review)
exports.getReview = controller.getOne(Review)
exports.createReview = controller.addOne(Review)
exports.updateReview = controller.updateOne(Review)
exports.deleteReview = controller.deleteOne(Review)

  