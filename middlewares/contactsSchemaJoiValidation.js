const { contactsSchemaJoi } = require("../schemas/contactsSchema");

const contactsSchemaJoiValidation = (body) => {
	const { error } = contactsSchemaJoi.validate(body);
	if (error) {
		error.status = 400;
		throw error;
	}
};

module.exports = contactsSchemaJoiValidation;
