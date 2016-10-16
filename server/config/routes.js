var viewController = require('../controllers/viewController');

module.exports.http = (app) => {
	app.get('/', viewController.index);
};

module.exports.socket = (app) => {
};