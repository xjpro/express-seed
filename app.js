// Ensure we're in the project directory, so relative paths work as expected
process.chdir(__dirname);

global._ = require('lodash');
global.Promise = require('bluebird');

var config = require('./server/config/config.js');

console.log(`server\t starting in ${config.environment} mode...`);

var app = Promise.promisifyAll(require('./server/config/express'));
var server = Promise.promisifyAll(require('http').Server(app));
return server.listenAsync(config.express.port)
	.then(err => {
		if (err) process.exit(10);
	});
