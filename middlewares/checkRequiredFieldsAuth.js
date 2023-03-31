const checkRequiredFieldsAuth = (body) => {
	const requiredFields = ["email", "password"];
	const missingField = requiredFields.filter(
		(field) => !Object.keys(body).includes(field)
	);
	if (missingField.length) {
		Error.status = 400;
		Error.message = `missing required '${missingField}' field`;
		throw Error;
	}
};

module.exports = checkRequiredFieldsAuth;
