const express = require('express')
const Movie = require('../models/movieModel')
const movieController = require('./../controllers/movieContoller')


const router = express.Router()


router.route('/')
  .get(movieController.getAllMovies)
  .post(movieController.createMovie)

router.route('/:id')
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie)


module.exports = router