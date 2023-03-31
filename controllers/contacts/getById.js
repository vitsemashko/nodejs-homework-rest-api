const Contact = require("../../models/contact");

const { isValidId } = require("../../middlewares");

async function getById(req, res, next) {
	try {
		const { contactId } = req.params;
		isValidId(contactId);
		const result = await Contact.findOne(
			{ _id: contactId },
			"-crearedAt -updatedAt"
		);
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
