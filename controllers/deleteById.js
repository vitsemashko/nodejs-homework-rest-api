const contactsOperations = require("../models/contacts");

async function deleteById(req, res, next) {
	try {
		const { contactId } = req.params;
		const result = await contactsOperations.getContactById(contactId);
		if (!result) {
			const error = new Error();
			error.message = "Not found";
			error.status = 404;
			throw error;
		}
		await contactsOperations.removeContact(contactId);

		res.json({
			message: "contact deleted",
		});
	} catch (error) {
		next(error);
	}
}

module.exports = deleteById;
