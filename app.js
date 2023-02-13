const express = require('express');
const app = express();
const eventRouter = require('./routes/eventRoutes');
const userRouter = require('./routes/userRoutes');

// 1) MIDDLEWARES
app.use(express.json());

// 2) ROUTES
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/users', userRouter);

// 3) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
