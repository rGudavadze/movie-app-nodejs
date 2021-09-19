const express = require('express')
const starController = require('./../controllers/starController')
const auth = require('./../controllers/authController')


const router = express.Router()


router.route('/')
  .get(starController.getAllStars)
  .post(auth.protect, auth.allowAccess('admin'), starController.createStar)

router.route('/:id')
  .get(starController.getStar)
  .post(auth.protect, auth.allowAccess('admin'), starController.updateStar)
  .patch(auth.protect, auth.allowAccess('admin'), starController.updateStar)


module.exports = router