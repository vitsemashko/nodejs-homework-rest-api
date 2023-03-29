const contactsSchema = require("../schemas/contactsSchema");

const contactsSchemaValidation = (body) => {
	const { error } = contactsSchema.validate(body);
	if (error) {
		error.status = 400;
		throw error;
	}
};

module.exports = contactsSchemaValidation;
