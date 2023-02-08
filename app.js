const express = require('express');
const app = express();
const port = 3000;

// JSON data file
const usersFile = './data/users.json';

// Middleware
app.use(express.json());

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});