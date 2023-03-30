const contactsOperations = require("../models/contacts");

async function getById(req, res, next) {
	try {
		const { contactId } = req.params;
		const result = await contactsOperations.getContactById(contactId);
		if (!result) {
			const error = new Error();
			error.message = "Not found";
			error.status = 404;
			throw error;
		}
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}

module.exports = getById;
