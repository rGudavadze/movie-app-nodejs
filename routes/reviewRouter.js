const express = require('express')
const reviewController = require('./../controllers/reviewController')
const auth = require('./../controllers/authController')

const router = express.Router({ mergeParams: true })  // Otherwise this route do not have access to tourId

router.route('/')
  .get(auth.protect, auth.allowAccess('admin'), reviewController.getAllReviews)
  .post(auth.protect, 
        auth.allowAccess('user'),
        reviewController.setMovieUserIds,
        reviewController.createReview)

router.route('/:id')
  .get(reviewController.getReview)
  .patch(auth.protect, reviewController.updateReview)
  .delete(auth.protect, reviewController.deleteReview)


module.exports = router