const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { userRegisterSchemaJoi } = require("../../schemas/usersSchema");

const { checkFields, checkRequiredFieldsAuth } = require("../../middlewares");
const User = require("../../models/user");
const { sendEmail } = require("../../helpers");
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
		const verificationToken = v4();
		const avatarURL = gravatar.url(email);
		const newUser = new User({ email, password, avatarURL, verificationToken });
		await newUser.setPassword(password);
		await newUser.save();

		const mail = {
			to: email,
			subject: "Email verification",
			html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Verify email</a>`,
		};
		await sendEmail(mail);
		res
			.status(201)
			.json({
				user: {
					email,
					subscription: newUser.subscription,
					avatarURL,
					verificationToken,
				},
			});
	} catch (error) {
		next(error);
	}
}

module.exports = register;
