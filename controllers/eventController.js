const fs = require('fs');

// JSON data
const events = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/events.json`, 'utf-8')
);

exports.getAllEvents = (req, res) => {
  // Get All Events
};

exports.getEvent = (req, res) => {
  // Get Event by ID
};

exports.getEventsByDay = (req, res) => {
  // Get Event by Day of the Week
};

exports.createEvent = (req, res) => {
  // Create New Event
};

exports.deleteEvent = (req, res) => {
  // Delete Event by ID
};

exports.deleteEventsByDay = (req, res) => {
  // Delete Event by Day of the Week
};