const express = require('express')
const reviewController = require('./../controllers/reviewController')
const auth = require('./../controllers/authController')

const router = express.Router({ mergeParams: true })  // Otherwise this route do not have access to tourId



router.route('/')
  .get(reviewController.getAllReviews)
  .post(auth.protect, auth.allowAccess('user', 'admin'),
        reviewController.setMovieUserIds,
        reviewController.createReview)


router.use(auth.protect)

router.route('/:id')
  .get(auth.correctUser, reviewController.getReview)
  .patch(auth.correctUser, reviewController.updateReview)
  .delete(auth.correctUser, reviewController.deleteReview)


module.exports = router