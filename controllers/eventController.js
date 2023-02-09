const fs = require('fs');

// 1) JSON DATA
const events = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/events.json`, 'utf-8')
);

// 2) VALIDATIONS
exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > events.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const { description, dateTime, createdAt } = req.body;
  if (!description || !dateTime || !createdAt) {
    return res.status(400).json({
      status: 'fail',
      message: 'Description, date and time, and created at are required'
    });
  }
  next();
};

// 3) ENDPOINTS
exports.getAllEvents = (req, res) => {
  // TODO Get All Events
};

exports.getEvent = (req, res) => {
  // TODO Get Event by ID
};

exports.getEventsByDay = (req, res) => {
  // TODO Get Event by Day of the Week
};

exports.createEvent = (req, res) => {
  // TODO Create New Event
};

exports.deleteEvent = (req, res) => {
  // TODO Delete Event by ID
};

exports.deleteEventsByDay = (req, res) => {
  // TODO Delete Event by Day of the Week
};