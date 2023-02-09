const express = require('express');
const app = express();
const port = 3000;

const eventRouter = require('./routes/eventRoutes');
const userRouter = require('./routes/userRoutes');

// 1) MIDDLEWARES
app.use(express.json());

// 2) ROUTES
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/users', userRouter);

// 3) START SERVER
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});