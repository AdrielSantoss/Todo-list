const app = require('express')(),
    bodyParser = require('body-parser'),
    consign = require('consign'),
    cors = require('cors'),
    validator = require('express-validator'),
    db = require('./database'),
    notifier = require('node-notifier'),
    hostServer = require('./IhostServer');

app.db = db;
app.notifier = notifier;
app.hostServer = hostServer;

app.use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cors())
    .use(validator());

consign().include('app/routes').include('app/controllers').include('app/repositories').into(app);

module.exports = app;
