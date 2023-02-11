const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// 1) ENDPOINTS
router
  .route('/signUp')
  .post(userController.signUp);

router
  .route('/signIn')
  .post(userController.signIn);

module.exports = router;