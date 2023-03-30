const Contact = require("../models/contact");
const {
	checkRequiredFields,
	contactsSchemaJoiValidation,
} = require("../middlewares");
async function post(req, res, next) {
	try {
		const { body } = req;
		checkRequiredFields(body);
		contactsSchemaJoiValidation(body);
		const result = await Contact.create(body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
}

module.exports = post;
