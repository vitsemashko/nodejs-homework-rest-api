const { updateFavoriteSchemaJoi } = require("../schemas/contactsSchema");

const updateFavoriteSchemaJoiValidation = (body) => {
	const { error } = updateFavoriteSchemaJoi.validate(body);
	if (error) {
		error.status = 400;
		error.message = "missing field favorite";
		throw error;
	}
};

module.exports = updateFavoriteSchemaJoiValidation;
