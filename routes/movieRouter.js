const express = require('express')
const movieController = require('./../controllers/movieContoller')
const auth = require('./../controllers/authController')
const reviewRouter = require('./reviewRouter')


const router = express.Router()

// For nested route
router.use('/:movieId/reviews', reviewRouter)


router.route('/')
  .get(movieController.getAllMovies)
  .post(auth.protect, auth.allowAccess('admin'), movieController.createMovie)

router.route('/:id')
  .get(movieController.getMovie)
  .patch(auth.protect, auth.allowAccess('admin'), movieController.updateMovie)
  .delete(auth.protect, auth.allowAccess('admin'), movieController.deleteMovie)


module.exports = router