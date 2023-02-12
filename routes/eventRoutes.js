const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.checkBody, eventController.createEvent);

router
  .route('/:param')
  .get(eventController.getByParam)
  .delete(eventController.deleteByParam);

module.exports = router;
