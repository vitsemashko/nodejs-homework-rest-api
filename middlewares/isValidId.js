const { isValidObjectId } = require("mongoose");

const isValidId = (id) => {
	const isCorrectId = isValidObjectId(id);
	if (!isCorrectId) {
		const error = new Error("Not found");
		error.status = 404;
		throw error;
	}
};

module.exports = isValidId;
