const fs = require('fs');
const uuid = require('uuid/v4');

// 1) JSON DATA
const events = JSON.parse(
  fs.readFile(`${__dirname}/../data/events.json`, 'utf-8')
);

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
    const id = req.params.id;
    const event = events.find((el) => el.id === id);
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
  const day = req.params.day;
  const eventsByDay = events.filter((event) => event.day === day);
  if (!eventsByDay) {
    return res.status(404).json({
      status: 'fail',
      message: `No events found for day: ${day}`,
    });
  }
  res.status(200).json({
    status: 'success',
    results: eventsByDay.length,
    data: {
      eventsByDay,
    },
  });
};

exports.createEvent = (req, res) => {
  const newEvent = { id: uuid(), ...req.body };
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
  const id = req.params.id;
  const eventIndex = events.findIndex((el) => el.id === id);
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
