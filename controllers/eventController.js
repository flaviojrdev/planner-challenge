const fs = require('fs');
const { v4: uuid } = require('uuid');
const validDays = require('../data/validDays.json').days;

// 1) JSON DATA
const events = JSON.parse(fs.readFileSync(`${__dirname}/../data/events.json`));

// 2) VALIDATIONS
exports.checkBody = (req, res, next) => {
  const { description, dateTime, createdAt } = req.body;
  if (!description || !dateTime || !createdAt) {
    return res.status(400).json({
      status: 'fail',
      message: 'Description, date and time, and created at are required',
    });
  }
  next();
};

// 3) ROUTE HANDLERS
exports.getAllEvents = (req, res) => {
  try {
    const allEvents = events;
    if (!allEvents || allEvents.length === 0) {
      throw new Error('No events found');
    }
    res.status(200).json({
      status: 'success',
      results: allEvents.length,
      data: {
        allEvents,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getEvent = (req, res) => {
  try {
    const id = req.params._id;
    const event = events.find((el) => el._id === id);
    if (!event) {
      return res.status(404).json({
        status: 'fail',
        message: `Event not found with id: ${id}`,
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        event,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while retrieving event.',
    });
  }
};

exports.getEventsByDay = (req, res) => {
  try {
    const day = req.params[Object.keys(req.params)[0]];
    if (!validDays.includes(day)) {
      return res.status(404).json({
        status: 'fail',
        message: `Invalid day: ${day}`,
      });
    }
    const eventsByDay = events.filter((event) => {
      const eventDay = new Date(event.dateTime).getDay();
      return validDays[eventDay] === day;
    });
    if (!eventsByDay || eventsByDay.length === 0) {
      throw new Error(`No events found for ${day}`);
    }
    res.status(200).json({
      status: 'success',
      results: eventsByDay.length,
      data: {
        eventsByDay,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};


exports.createEvent = (req, res) => {
  const newEvent = { _id: uuid(), ...req.body };
  events.push(newEvent);
  fs.writeFile(
    `${__dirname}/../data/events.json`,
    JSON.stringify(events),
    (err) => {
      if (err) return res.status(500).json({ status: 'error', message: err });
      return res
        .status(201)
        .json({ status: 'success', data: { event: newEvent } });
    }
  );
};

exports.deleteEvent = (req, res) => {
  const id = req.params._id;
  const eventIndex = events.findIndex((el) => el._id === id);
  events.splice(eventIndex, 1);
  fs.writeFile(
    `${__dirname}/../data/events.json`,
    JSON.stringify(events),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Error deleting event',
        });
      }
      return res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

exports.deleteEventsByDay = (req, res) => {
  const day = req.params.day;
  events = events.filter((event) => event.day !== day);
  fs.writeFile(
    `${__dirname}/../data/events.json`,
    JSON.stringify(events),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Could not delete events by day',
        });
      }
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
