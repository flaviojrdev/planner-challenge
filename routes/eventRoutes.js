const express = require('express');
const eventController = require('../controllers/eventController');
const validDays = require('../data/validDays.json').days;

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

validDays.forEach((day) => {
  router
    .route(`/:${day}`)
    .get(eventController.getEventsByDay)
    .delete(eventController.deleteEventsByDay);
});

router
  .route('/:_id')
  .get(eventController.getEvent)
  .delete(eventController.deleteEvent);

module.exports = router;
