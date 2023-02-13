const fs = require('fs');
const { v4: uuid } = require('uuid');
const validDays = require('../data/validDays.json').days;

// 1) DATA (JSON)
let events = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/events.json`, 'utf8')
);

// 2) MIDDLEWARE
exports.getByParam = (req, res) => {
  const { param } = req.params;
  validDays.includes(param)
    ? getEventByDay(req, res, param)
    : getEventById(req, res, param);
};

exports.deleteByParam = (req, res) => {
  const { param } = req.params;
  validDays.includes(param)
    ? deleteEventByDay(req, res, param)
    : deleteEventById(req, res, param);
};

exports.checkBody = (req, res, next) => {
  const { description, dateTime } = req.body;
  const allowedKeys = ['description', 'dateTime'];
  const keys = Object.keys(req.body);
  if (!description || !dateTime)
    return res
      .status(400)
      .json({ status: 'fail', message: 'All fields are required.' });
  if (typeof description !== 'string' || typeof dateTime !== 'string')
    return res.status(400).json({
      status: 'fail',
      message: 'Both description and dateTime should be of type string',
    });
  if (!keys.every((key) => allowedKeys.includes(key)))
    return res.status(400).json({
      status: 'fail',
      message: 'Only description and dateTime are allowed.',
    });

  const isoDateTimeRegEx =
    /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d{3}Z$/;
  if (!dateTime.match(isoDateTimeRegEx))
    return res.status(400).json({
      status: 'fail',
      message: 'DateTime must be in ISO 8601 format.',
    });

  next();
};

// 3) HANDLERS
exports.getAllEvents = (req, res) => {
  const allEvents = events;
  if (!allEvents || allEvents.length === 0)
    return res
      .status(404)
      .json({ status: 'fail', message: 'No events found.' });
  res.status(200).json({
    status: 'success',
    results: allEvents.length,
    data: { allEvents },
  });
};

const getEventById = (req, res, id) => {
  const event = events.find((el) => el._id === id);
  if (!event)
    return res
      .status(404)
      .json({ status: 'fail', message: `Event not found with id: ${id}` });
  res.status(200).json({ status: 'success', data: { event } });
};

const getEventByDay = (req, res, dayOfTheWeek) => {
  if (!validDays.includes(dayOfTheWeek))
    return res
      .status(404)
      .json({ status: 'fail', message: `Invalid day: ${dayOfTheWeek}` });
  const eventsByDay = events.filter((event) => {
    const eventDate = new Date(event.dateTime);
    const eventDay = eventDate
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase();
    return eventDay === dayOfTheWeek.toLowerCase();
  });
  if (!eventsByDay || eventsByDay.length === 0)
    return res
      .status(404)
      .json({ status: 'fail', message: `No events found for ${dayOfTheWeek}` });
  res.status(200).json({
    status: 'success',
    results: eventsByDay.length,
    data: { eventsByDay },
  });
};

exports.createEvent = async (req, res) => {
  const newEvent = {
    _id: uuid(),
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  events.push(newEvent);
  try {
    await fs.promises.writeFile(
      `${__dirname}/../data/events.json`,
      JSON.stringify(events)
    );
    return res
      .status(201)
      .json({ status: 'success', data: { event: newEvent } });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err });
  }
};

const deleteEventById = (req, res, id) => {
  const eventIndex = events.findIndex((el) => el._id === id);
  if (eventIndex === -1)
    return res
      .status(404)
      .json({ status: 'fail', message: `Event not found with id: ${id}` });
  events.splice(eventIndex, 1);
  fs.writeFile(
    `${__dirname}/../data/events.json`,
    JSON.stringify(events),
    (err) => {
      if (err)
        return res
          .status(500)
          .json({ status: 'fail', message: 'Error writing events data' });
      res.status(200).json({ status: 'success', message: 'Event deleted' });
    }
  );
};

const deleteEventByDay = (req, res, dayOfTheWeek) => {
  const eventsOnDay = events.filter(
    (event) => validDays[new Date(event.dateTime).getDay()] === dayOfTheWeek
  );
  if (eventsOnDay.length === 0) {
    return res
      .status(404)
      .json({ status: 'fail', message: `No events found on ${dayOfTheWeek}` });
  }
  events = events.filter(
    (event) => validDays[new Date(event.dateTime).getDay()] !== dayOfTheWeek
  );
  fs.writeFile(
    `${__dirname}/../data/events.json`,
    JSON.stringify(events),
    (err) => {
      if (err) {
        console.error(`Error writing events data: ${err}`);
        return res
          .status(500)
          .json({ status: 'fail', message: 'Error writing events data' });
      }
      res.status(200).json({ status: 'success', message: 'Event deleted' });
    }
  );
};
