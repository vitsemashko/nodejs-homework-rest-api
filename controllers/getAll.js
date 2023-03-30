const Contact = require("../models/contact");

async function getAll(req, res, next) {
	try {
		const contacts = await Contact.find({}, "-createdAt -updatedAt");
		res.status(200).json(contacts);
	} catch (error) {
		next(error);
	}
}

module.exports = getAll;
