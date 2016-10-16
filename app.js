// Ensure we're in the project directory, so relative paths work as expected
process.chdir(__dirname);

global._ = require('lodash');
global.Promise = require('bluebird');

var config = require('./server/config/config.js');
var app = Promise.promisifyAll(require('./server/config/express'));
var server = Promise.promisifyAll(require('http').Server(app));
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

console.log(`server\t starting in ${config.environment} mode...`);

var databaseUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
mongoose.connect(databaseUrl)
	.then(() => {
		console.log(`db\t\t connected at mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
		return server.listenAsync(config.express.port);
	})
	.then(() => {
		console.log(`server\t hosted at http://${config.express.ip}:${config.express.port}`);
	})
	.catch(err => {
		console.error(err);
		process.exit(10);
	});