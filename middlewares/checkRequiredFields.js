const checkRequiredFields = (body) => {
	const requiredFields = ["name", "email", "phone"];
	const missingFields = requiredFields.filter(
		(field) => !Object.keys(body).includes(field)
	);
	if (missingFields.length) {
		Error.status = 400;
		Error.message = `missing required '${missingFields.join(", ")}' field(s)`;
		throw Error;
	}
};

module.exports = checkRequiredFields;
