const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signUp', userController.checkBody, userController.signUp);
router.post('/signIn', userController.signIn);

module.exports = router;
