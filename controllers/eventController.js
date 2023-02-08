const fs = require('fs');

// JSON data
const events = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/events.json`, 'utf-8')
);

const getAllEvents = (req, res) => {
  // Get All Events
};

const getEvent = (req, res) => {
  // Get Event by ID
};

const getEventsByDay = (req, res) => {
  // Get Event by Day of the Week
};

const createEvent = (req, res) => {
  // Create New Event
};

const deleteEvent = (req, res) => {
  // Delete Event by ID
};

const deleteEventsByDay = (req, res) => {
  // Delete Event by Day of the Week
};