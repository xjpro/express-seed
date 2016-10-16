module.exports = (req, res, next) => {
	res.serverError = function (data) {
		res.status(500);
		if (/application\/json/.test(req.get('accept'))) {
			res.json(data);
		}
		else {
			res.send(data);
		}
		return null;
	};
	next();
};