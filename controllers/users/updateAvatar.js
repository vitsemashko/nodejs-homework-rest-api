const path = require("node:path");
const fs = require("node:fs/promises");
const Jimp = require("jimp");
const User = require("../../models/user");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");
async function updateAvatar(req, res, next) {
	const { path: tempUpload, originalname } = req.file;
	const { _id: id } = req.user;
	const imageName = `${id}_${originalname}`;
	try {
		const resultUpload = path.join(avatarsDir, imageName);
		await fs.rename(tempUpload, resultUpload);
		const image = await Jimp.read(resultUpload);
		await image.resize(250, 250);
		const resizedImageName = `${id}_250x250_${originalname}`;
		const resizedImagePath = path.join(avatarsDir, resizedImageName);
		await image.writeAsync(resizedImagePath);
		await fs.unlink(resultUpload);
		const avatarURL = path.join("public", "avatars", resizedImageName);
		await User.findByIdAndUpdate(req.user._id, { avatarURL });
		res.json({ avatarURL });
	} catch (error) {
		await fs.unlink(tempUpload);
		throw error;
	}
}

module.exports = updateAvatar;
