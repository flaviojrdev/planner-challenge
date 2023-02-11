const express = require('express');
const { signUp, signIn, checkBody } = require('../controllers/userController');

const router = express.Router();

router.post('/signUp', checkBody, signUp);
router.post('/signIn', signIn);

module.exports = router;