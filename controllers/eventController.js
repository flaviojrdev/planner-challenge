const fs = require('fs');
const { v4: uuid } = require('uuid');
const validDays = require('../data/validDays.json').days;

// 1) DATA (JSON)
let events = JSON.parse(fs.readFileSync(`${__dirname}/../data/events.json`));

// 2) MIDDLEWARE
exports.getByParam = (req, res) => {
  const { param } = req.params;
  validDays.includes(param)
    ? getEventsByDay(req, res, param)
    : getEvent(req, res, param);
};

exports.deleteByParam = (req, res) => {
  const { param } = req.params;
  validDays.includes(param)
    ? deleteEventsByDay(req, res, param)
    : deleteEvent(req, res, param);
};

exports.checkBody = (req, res, next) => {
  const { description, dateTime, createdAt } = req.body;
  if (!description || !dateTime || !createdAt)
    return res
      .status(400)
      .json({ status: 'fail', message: 'All fields are required.' });
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

const getEvent = (req, res, id) => {
  const event = events.find((el) => el._id === id);
  if (!event)
    return res
      .status(404)
      .json({ status: 'fail', message: `Event not found with id: ${id}` });
  res.status(200).json({ status: 'success', data: { event } });
};

const getEventsByDay = (req, res, dayOfTheWeek) => {
  if (!validDays.includes(dayOfTheWeek))
    return res
      .status(404)
      .json({ status: 'fail', message: `Invalid day: ${dayOfTheWeek}` });
  const eventsByDay = events.filter((event) => {
    const eventDay = new Date(event.dateTime).getDay();
    return validDays[eventDay] === dayOfTheWeek;
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
  const newEvent = { _id: uuid(), ...req.body };
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

const deleteEvent = (req, res, id) => {
  // FIX ME
};

const deleteEventsByDay = (req, res, dayOfTheWeek) => {
  // FIX ME
};
