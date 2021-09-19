const express = require('express')
const userController = require('./../controllers/userController')
const auth = require('./../controllers/authController')

const router = express.Router()

router.post('/signup', auth.signup)
router.post('/login', auth.login)

// Middleware for all the routes below. Middlewares runs in sequense.
router.use(auth.protect, auth.allowAccess('admin'))

router.route('/')
  .get(userController.getAllUsers)

router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)


module.exports = router