const express = require('express');
const { errorHandlers } = require('./middleware');
const router = require('./routes');

const app = express();

app.use(express.static('public'))

app.use(express.json());

app.use('/api', router);

// Add endpoints handlers

app.use(errorHandlers.dbErrorHandler, errorHandlers.errorHandler);

module.exports = app;
