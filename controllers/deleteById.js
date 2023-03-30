const Contact = require("../models/contact");

const { isValidId } = require("../middlewares");

async function deleteById(req, res, next) {
	try {
		const { contactId } = req.params;
		isValidId(contactId);
		const result = await Contact.findById(contactId);
		if (!result) {
			const error = new Error();
			error.message = "Not found";
			error.status = 404;
			throw error;
		}
		await Contact.findByIdAndRemove(contactId);
		res.json({
			message: "contact deleted",
		});
	} catch (error) {
		next(error);
	}
}

module.exports = deleteById;
