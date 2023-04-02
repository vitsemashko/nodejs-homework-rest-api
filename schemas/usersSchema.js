const Joi = require("joi");

const { Schema } = require("mongoose");

const bcrypt = require("bcryptjs");

const { handleValidationErrors } = require("../helpers");

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Set password for user"],
			minlength: 6,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: {
			type: String,
			required: true,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, "Verify token is required"],
		},
	},
	{ versionKey: false, timestamps: true }
);
userSchema.post("save", handleValidationErrors);

userSchema.methods.setPassword = function (password) {
	this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

const userRegisterSchemaJoi = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().min(6).required(),
});
const userLoginSchemaJoi = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().min(6).required(),
});
const verifyEmailSchemaJoi = Joi.object({
	email: Joi.string().required(),
});
module.exports = {
	userSchema,
	userRegisterSchemaJoi,
	userLoginSchemaJoi,
	verifyEmailSchemaJoi,
};
