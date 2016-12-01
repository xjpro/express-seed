module.exports = (req, res, next) => {
	res.ok = function (data) {
		res.status(400);
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