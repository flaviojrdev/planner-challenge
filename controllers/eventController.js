const fs = require('fs');
const { v4: uuid } = require('uuid');
const validDays = require('../data/validDays.json').days;

// 1) JSON DATA
let events = JSON.parse(fs.readFileSync(`${__dirname}/../data/events.json`));

// 2) VALIDATIONS
exports.checkBody = (req, res, next) => {
  const { description, dateTime, createdAt } = req.body;
  if (!description || !dateTime || !createdAt) {
    return res.status(400).json({
      status: 'fail',
      message:
        'description, dateTime, and createdAt are required. (Check upper and lower case).',
    });
  }
  next();
};

exports.checkDay = (req, res, next, day) => {
  if (validDays.includes(day)) {
    req.day = day;
    next();
  } else {
    return res.status(400).json({ error: 'Invalid day' });
  }
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

exports.getEvent = (req, res, id) => {
  try {
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

exports.getEventsByDay = (req, res, dayOfTheWeek) => {
  try {
    if (!validDays.includes(dayOfTheWeek)) {
      return res.status(404).json({
        status: 'fail',
        message: `Invalid day: ${dayOfTheWeek}`,
      });
    }
    const eventsByDay = events.filter((event) => {
      const eventDay = new Date(event.dateTime).getDay();
      return validDays[eventDay] === dayOfTheWeek;
    });
    if (!eventsByDay || eventsByDay.length === 0) {
      throw new Error(`No events found for ${dayOfTheWeek}`);
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

exports.deleteEvent = (req, res, id) => {
  // FIX ME
};

exports.deleteEventsByDay = (req, res, dayOfTheWeek) => {
  // FIX ME
};
