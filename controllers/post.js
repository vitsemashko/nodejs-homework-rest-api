const contactsOperations = require("../models/contacts");
const {
	checkRequiredFields,
	contactsSchemaValidation,
} = require("../middlewares");
async function post(req, res, next) {
	try {
		const { body } = req;
		checkRequiredFields(body);
		contactsSchemaValidation(body);
		const result = await contactsOperations.addContact(body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
}

module.exports = post;
