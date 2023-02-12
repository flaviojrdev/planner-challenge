const express = require('express');
const eventController = require('../controllers/eventController');
const validDays = require('../data/validDays.json').days;
const router = express.Router();

// 1) MIDDLEWARES
router.param('day', eventController.checkDay);

// 2) ROUTES
router
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.checkBody, eventController.createEvent);

router
  .route('/:param')
  .get((req, res, next) => {
    const { param } = req.params;
    if (validDays.includes(param)) {
      const dayOfTheWeek = param;
      eventController.getEventsByDay(req, res, dayOfTheWeek);
    } else {
      const id = param;
      eventController.getEvent(req, res, id);
    }
  })
  .delete((req, res, next) => {
    const { param } = req.params;
    if (validDays.includes(param)) {
      const dayOfTheWeek = param;
      eventController.deleteEventsByDay(req, res, dayOfTheWeek);
    } else {
      const id = param;
      eventController.deleteEvent(req, res, id);
    }
  });

module.exports = router;
