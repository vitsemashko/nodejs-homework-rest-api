const isIdValid = (items, id) => {
	const isIdValid = items.find((item) => {
		return item.id === id;
	});
	if (!isIdValid) {
		const error = new Error("Not found");
		error.status = 404;
		throw error;
	}
};

module.exports = isIdValid;
