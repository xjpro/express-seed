// check the command line options for a -env=someEnvironment
const environment = _(process.argv)
		.map(item => {

			// unfortunately mocha mangles the env=something, so using regex to check both
			// ex:
			// -env-integration-testing
			// -env=integration-testing
			const match = /-env(?:-|=)((?:\w|-)+)/gi.exec(item);
			if (match && match[1]) {
				return match[1];
			}
		})
		.compact()
		.first() || process.env.NODE_ENV || 'development';

const config = require('./env/' + environment);

config.isLocal = (req) => {
	return req.connection.remoteAddress === '127.0.0.1'
		|| req.connection.remoteAddress === '::1'
		|| req.connection.remoteAddress === '::ffff:127.0.0.1'
		|| config.environment == 'integration-testing';
};

module.exports = config;