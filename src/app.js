const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const { getProfile } = require('./middleware/getProfile');

const app = express();

app.use(bodyParser.json());
app.set('models', db.models);
app.use(getProfile);

const api = require('./routes');

app.use('/api', api);

module.exports = app;
