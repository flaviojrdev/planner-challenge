const express = require('express');
const eventController = require('../controllers/eventController');

const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

router.use((req, res, next) => {
  const { day } = req.params;

  if (validDays.includes(day)) {
    router.route('/:day')
      .get(eventController.getEventsByDay)
      .delete(eventController.deleteEventsByDay);
  } else {
    router.route('/:_id')
      .get(eventController.getEvent)
      .delete(eventController.deleteEvent);
  }

  next();
});

module.exports = router;