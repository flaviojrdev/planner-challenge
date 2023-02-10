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
    .route(`/day/:${day}`)
    .get(eventController.getEventsByDay)
    .delete(eventController.deleteEventsByDay);
});

router
  .route('/id/:_id')
  .get(eventController.getEvent)
  .delete(eventController.deleteEvent);

module.exports = router;
