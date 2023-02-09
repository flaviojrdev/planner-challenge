const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

router
  .route('/:_id')
  .get(eventController.getEvent)
  .delete(eventController.deleteEvent);

router.route('/:day').delete(eventController.deleteEventsByDay);

module.exports = router;
