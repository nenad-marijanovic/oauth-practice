'use strict';

const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const http = require('http');
const { mobileRouter } = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(`/rest/v1/`, mobileRouter);
const server = http.createServer(app);
server.listen(4001, () => logger.info(`Listening on 4001`));
