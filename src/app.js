const express = require('express')
const routes = require('./routers')
const app = express()
const LoggerMiddleware = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json())
app.use(errorHandler)
app.use(LoggerMiddleware);

app.use('/', routes)

module.exports = app