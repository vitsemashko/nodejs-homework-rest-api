const Contact = require("../models/contact");

const {
	isValidId,
	updateFavoriteSchemaJoiValidation,
} = require("../middlewares");

async function patchContactStatus(req, res, next) {
	try {
		const { body } = req;
		updateFavoriteSchemaJoiValidation(body);
		const { contactId } = req.params;
		isValidId(contactId);
		const result = await Contact.findByIdAndUpdate(contactId, body, {
			new: true,
		});
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

module.exports = patchContactStatus;
