const User = require("../../models/user");

async function verifyEmail(req, res, next) {
	try {
		const { verificationToken } = req.params;
		const user = await User.findOne({ verificationToken });
		if (!user) {
			Error.status = 404;
			Error.message = "User not found";
			throw Error;
		}
		await User.findByIdAndUpdate(user._id, {
			verify: true,
			verificationToken: null,
		});
		res.status(200).json({ message: "Verification successful" });
	} catch (error) {
		next(error);
	}
}

module.exports = verifyEmail;
