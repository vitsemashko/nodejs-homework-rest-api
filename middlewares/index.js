const auth = require("./auth");
const checkRequiredFields = require("./checkRequiredFields");
const contactsSchemaJoiValidation = require("./contactsSchemaJoiValidation");
const checkFields = require("./checkFields");
const checkRequiredFieldsAuth = require("./checkRequiredFieldsAuth");
const isValidId = require("./isValidId");
const checkRequiredFieldEmail = require("./checkRequiredFieldEmail");
const updateFavoriteSchemaJoiValidation = require("./updateFavoriteSchemaJoiValidation");
const upload = require("./upload");

module.exports = {
	auth,
	checkRequiredFields,
	checkRequiredFieldsAuth,
	checkRequiredFieldEmail,
	contactsSchemaJoiValidation,
	checkFields,
	isValidId,
	updateFavoriteSchemaJoiValidation,
	upload,
};
