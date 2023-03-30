const contactsOperations = require("../models/contacts");
const {
	isIdValid,
	contactsSchemaValidation,
	checkFields,
} = require("../middlewares");

async function putById(req, res, next) {
	try {
		const { body } = req;
		checkFields(body);
		contactsSchemaValidation(body);
		const { contactId } = req.params;
		const contacts = await contactsOperations.listContacts();
		isIdValid(contacts, contactId);
		const result = await contactsOperations.updateContact(contactId, body);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}
module.exports = putById;
