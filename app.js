const express = require('express');
const app = express();
const port = 3000;

// JSON data files
const usersFile = './data/users.json';

// Middlewares
app.use(express.json());
app.use('/api/v1', plannerRouter);


const plannerRouter = express.Router();

/* 

POST ROUTES

*/
app.post('/users', (req, res) => {
  // Create New User
});

app.post('/users/signin', (req, res) => {
  // Sign In User
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});