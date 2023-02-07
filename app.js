const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// JSON data files
const eventsFile = './data/events.json';
const usersFile = './data/users.json';

// Middlewares
app.use(express.json());
app.use('/api/v1', plannerRouter);

/* 

GET ROUTES

*/
const plannerRouter = express.Router();

app.get('/events', (req, res) => {
  // Get All Events
});

app.get('/events/:day', (req, res) => {
  // Get Event by Day of the Week
});

app.get('/events/:id', (req, res) => {
  // Get Event by ID
});

/* 

POST ROUTES

*/
app.post('/users', (req, res) => {
  // Create New User
});

app.post('/users/signin', (req, res) => {
  // Sign In User
});

app.post('/events', (req, res) => {
  // Create New Event
});

/* 

DELETE ROUTES

*/
app.delete('/events/:id', (req, res) => {
  // Delete Event by ID
});

app.delete('/events/:day', (req, res) => {
  // Delete Event by Day of the Week
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});