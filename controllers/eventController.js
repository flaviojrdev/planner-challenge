const fs = require('fs');
const uuid = require('uuid/v4');

// 1) JSON DATA
const events = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/events.json`, 'utf-8')
);

// 2) VALIDATIONS
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

// 3) ROUTE HANDLERS
exports.getAllEvents = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: events.length,
    data: {
      events
    }
  });
};

exports.getEvent = (req, res) => {
  const id = req.params.id;
  const event = events.find(el => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      event
    }
  });
};

exports.getEventsByDay = (req, res) => {
  const day = req.params.day;
  const eventsByDay = events.filter(event => event.day === day);
  res.status(200).json({
    status: 'success',
    results: eventsByDay.length,
    data: {
      eventsByDay
    }
  });
};

exports.createEvent = (req, res) => {
  const newEvent = {
    id: uuid(),
    ...req.body
  };
  events.push(newEvent);
  fs.writeFile(
    `${__dirname}/../data/events.json`,
    JSON.stringify(events),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          event: newEvent
        }
      });
    }
  );
};

exports.deleteEvent = (req, res) => {
  const id = req.params.id;
  const event = events.find(el => el.id === id);
  const index = events.indexOf(event);
  events.splice(index, 1);
  fs.writeFile(
    `${__dirname}/../data/events.json`,
    JSON.stringify(events),
    err => {
      res.status(204).json({
        status: 'success',
        data: null
      });
    }
  );
};

exports.deleteEventsByDay = (req, res) => {
  const day = req.params.day;
  const eventsByDay = events.filter(event => event.day === day);
  const index = events.indexOf(eventsByDay);
  events.splice(index, 1);
  fs.writeFile(
    `${__dirname}/../data/events.json`,
    JSON.stringify(events),
    err => {
      res.status(204).json({
        status: 'success',
        data: null
      });
    }
  );
};