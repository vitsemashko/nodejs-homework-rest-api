const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;
const { userLoginSchemaJoi } = require("../../schemas/usersSchema");
const User = require("../../models/user");

const { checkFields, checkRequiredFieldsAuth } = require("../../middlewares");
async function login(req, res, next) {
	try {
		const { body } = req;
		checkFields(body);
		checkRequiredFieldsAuth(body);
		const { error } = userLoginSchemaJoi.validate(body);
		if (error) {
			error.status = 400;
			throw error;
		}
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user || !user.comparePassword(password)) {
			throw new Unauthorized("Email or password is wrong");
		}
		const payload = { id: user._id };
		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
		await User.findByIdAndUpdate(user._id, { token });
		res
			.status(200)
			.json({ token, user: { email, subscription: user.subscription } });
	} catch (error) {
		next(error);
	}
}

module.exports = login;
