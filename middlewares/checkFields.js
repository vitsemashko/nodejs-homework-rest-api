const checkFields = (body) => {
	if (!Object.keys(body).length) {
		Error.status = 400;
		Error.message = "missing fields";
		throw Error;
	}
};
module.exports = checkFields;
