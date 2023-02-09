const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/users/signUp')
  .post(userController.signUp);

router
  .route('/users/signIn')
  .post(userController.signIn);

module.exports = router;