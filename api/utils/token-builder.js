const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "lambdaSchool";

module.exports = function (user) {
	const payload = {
		subject: user.user_id,
		username: user.username,
	};
	const options = {
		expiresIn: "7d",
	};
	return jwt.sign(payload, secret, options);
};
