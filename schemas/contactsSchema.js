const Joi = require("joi");

const { Schema } = require("mongoose");

const { handleValidationErrors } = require("../helpers");

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
			unique: true,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post("save", handleValidationErrors);

const contactsSchemaJoi = Joi.object({
	name: Joi.string().alphanum().min(3).max(30),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net"] },
	}),
	phone: Joi.string(),
	favorite: Joi.bool(),
});

const updateFavoriteSchemaJoi = Joi.object({
	favorite: Joi.bool().required(),
});

module.exports = { contactsSchemaJoi, contactSchema, updateFavoriteSchemaJoi };
