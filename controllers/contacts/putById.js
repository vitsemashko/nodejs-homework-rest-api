const Contact = require("../../models/contact");
const {
	contactsSchemaJoiValidation,
	checkFields,
	isValidId,
} = require("../../middlewares");

async function putById(req, res, next) {
	try {
		const { body } = req;
		checkFields(body);
		contactsSchemaJoiValidation(body);
		const { contactId } = req.params;
		isValidId(contactId);
		const result = await Contact.findByIdAndUpdate(contactId, body, {
			new: true,
		});
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}
module.exports = putById;
