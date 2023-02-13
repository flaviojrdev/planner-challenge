const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const SwaggerUI = require('swagger-ui-express');
const { swaggerOptions } = require('./utils/swagger');

const eventRouter = require('./routes/eventRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) SWAGGER
const options = swaggerOptions;
const swaggerDocs = swaggerJsDoc(options);

// 2) MIDDLEWARES
app.use(express.json());

// 3) ROUTES
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/users', userRouter);
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocs));

// 4) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
