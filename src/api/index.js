const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const middlewares = require('./middlewares');
const routes = require('./routes');

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/api/v1', routes);

app.use(middlewares.errors.notFound);
app.use(middlewares.errors.errorHandler);

module.exports = app;
