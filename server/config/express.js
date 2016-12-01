var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var config = require('../config');

// put publicly accessible directories here
app.use('/dist', express.static('dist'));
app.use('/node_modules', express.static('node_modules'));

// setup session
app.use(session({
	secret: '$s3cr3tPassword-replace-this',
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({
		url: `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
	})
}));

app.set('view engine', 'ejs');
app.set('views', './server/views');
app.use(bodyParser.json());

// Enable responses
app.use(require('../responses/serverError'));
app.use(require('../responses/ok'));
app.use(require('../responses/invalid'));

// setup routes
require('./routes').http(app);
require('./routes').socket(app);

module.exports = app;