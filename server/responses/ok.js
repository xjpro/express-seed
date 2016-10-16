module.exports = (req, res, next) => {
	res.ok = function (data) {
		res.status(200);
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