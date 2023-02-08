const fs = require('fs');

// JSON data
const events = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/events.json`, 'utf-8')
);

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