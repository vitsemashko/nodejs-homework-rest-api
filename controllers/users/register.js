const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { userRegisterSchemaJoi } = require("../../schemas/usersSchema");

const { checkFields, checkRequiredFieldsAuth } = require("../../middlewares");
const User = require("../../models/user");
async function register(req, res, next) {
	try {
		const { body } = req;
		checkFields(body);
		checkRequiredFieldsAuth(body);
		const { error } = userRegisterSchemaJoi.validate(body);
		if (error) {
			error.status = 400;
			throw error;
		}
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			throw new Conflict(`Email in use`);
		}
		const avatarURL = gravatar.url(email);
		const newUser = new User({ email, password, avatarURL });
		await newUser.setPassword(password);
		await newUser.save();
		res
			.status(201)
			.json({ user: { email, subscription: newUser.subscription, avatarURL } });
	} catch (error) {
		next(error);
	}
}

module.exports = register;
