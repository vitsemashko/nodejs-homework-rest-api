async function getCurrent(req, res, next) {
	const { subscription, email } = req.user;
	res.status(200).json({ email, subscription });
}

module.exports = getCurrent;
