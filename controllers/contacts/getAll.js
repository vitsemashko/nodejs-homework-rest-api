const Contact = require("../../models/contact");

async function getAll(req, res, next) {
	try {
		const { _id } = req.user;
		const { page = 1, limit = 10 } = req.query;
		const skip = (page - 1) * limit;
		const contacts = await Contact.find(
			{ owner: _id },
			"-createdAt -updatedAt",
			{
				skip,
				limit: Number(limit),
			}
		).populate("owner", "_id email subscription");
		res.status(200).json(contacts);
	} catch (error) {
		next(error);
	}
}

module.exports = getAll;
