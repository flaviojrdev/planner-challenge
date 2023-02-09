const express = require('express');
const app = express();
const port = 3000;

const eventRouter = require('./routes/eventRoutes');
const userRouter = require('./routes/userRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/users', userRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});