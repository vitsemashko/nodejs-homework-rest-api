const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
	const email = { ...data, from: EMAIL };
	try {
		await sgMail.send(email);
	} catch (error) {
		throw error;
	}
};

module.exports = sendEmail;
