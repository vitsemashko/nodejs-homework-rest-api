const User = require("../../models/user");

const { verifyEmailSchemaJoi } = require("../../schemas/usersSchema");

const { checkFields, checkRequiredFieldEmail } = require("../../middlewares");
const { sendEmail } = require("../../helpers");
async function resendVerifyEmail(req, res, next) {
	try {
		const { body } = req;
		checkFields(body);
		checkRequiredFieldEmail(body);
		const { error } = verifyEmailSchemaJoi.validate(body);
		if (error) {
			error.status = 400;
			throw error;
		}
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			Error.status = 404;
			Error.message = "Not found";
			throw Error;
		}
		if (user.verify) {
			Error.status = 400;
			Error.message = "Verification has already been passed";
			throw Error;
		}
		const mail = {
			to: email,
			subject: "Email verification",
			html: `<a target="_blank" href="http://localhost:3000/users/verify/${user.verificationToken}">Verify email</a>`,
		};
		await sendEmail(mail);
		res.status(200).json({ message: "Verification email sent" });
	} catch (error) {
		next(error);
	}
}

module.exports = resendVerifyEmail;
