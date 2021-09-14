const express = require('express')
const starController = require('./../controllers/starController')


const router = express.Router()


router.route('/')
  .get(starController.getAllStars)
  .post(starController.createStar)

router.route('/:id')
  .get(starController.getStar)
  .post(starController.updateStar)
  .patch(starController.updateStar)


module.exports = router