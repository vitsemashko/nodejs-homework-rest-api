const { model } = require("mongoose");

const { userSchema } = require("../schemas/usersSchema");

const User = model("user", userSchema);

module.exports = User;
