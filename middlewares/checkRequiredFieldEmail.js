const checkRequiredFieldEmail = (body) => {
	const requiredFields = ["email"];
	const missingField = requiredFields.filter(
		(field) => !Object.keys(body).includes(field)
	);
	if (missingField.length) {
		Error.status = 400;
		Error.message = `"missing required field '${missingField}'`;
		throw Error;
	}
};

module.exports = checkRequiredFieldEmail;
