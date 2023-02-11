const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

// 1) MIDDLEWARES
router.param('day', eventController.checkDay);

// 2) ROUTES
router
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.checkBody, eventController.createEvent);

router
  .route('/day/:day')
  .get(eventController.getEventsByDay)
  .delete(eventController.deleteEventsByDay);

router
  .route('/id/:_id')
  .get(eventController.getEvent)
  .delete(eventController.deleteEvent);

module.exports = router;
