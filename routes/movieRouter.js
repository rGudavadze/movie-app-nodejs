const express = require('express')
const movieController = require('./../controllers/movieContoller')


const router = express.Router()


router.route('/')
  .get(movieController.getAllMovies)




module.exports = router