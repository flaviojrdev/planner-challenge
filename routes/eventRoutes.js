const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router
  .route('/events')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

router
  .route('/events/:id')
  .get(eventController.getEvent)
  .delete(eventController.deleteEvent);

router.route('/events/:day').delete(eventController.deleteEventsByDay);

module.exports = router;
