const contactsOperations = require("../models/contacts");

async function getAll(req, res, next) {
	try {
		const contacts = await contactsOperations.listContacts();
		res.status(200).json(contacts);
	} catch (error) {
		next(error);
	}
}

module.exports = getAll;
