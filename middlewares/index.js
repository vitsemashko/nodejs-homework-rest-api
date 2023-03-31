const checkRequiredFields = require("./checkRequiredFields");

const contactsSchemaJoiValidation = require("./contactsSchemaJoiValidation");
const checkFields = require("./checkFields");
const isValidId = require("./isValidId");
const updateFavoriteSchemaJoiValidation = require("./updateFavoriteSchemaJoiValidation");

module.exports = {
	checkRequiredFields,

	contactsSchemaJoiValidation,
	checkFields,
	isValidId,
	updateFavoriteSchemaJoiValidation,
};
