const jwt = require("jsonwebtoken");
const Users = require("../models/users-model");
const secret = process.env.JWT_SECRET || "lambdaSchool";

const validateCredentials = async (req, res, next) => {
	const body = req.body;

	if (!body || Object.keys(body).length === 0) {
		res.status(400).json({ message: "Textfields required." });
	} else if (!body.name) {
		res.status(400).json({ message: "Name required." });
	} else if (!body.username) {
		res.status(400).json({ message: "Username required." });
	} else if (!body.password) {
		res.status(400).json({ message: "Password required." });
	} else if ((typeof body.password || body.username) !== "string") {
		res
			.status(400)
			.json({ message: "Password and username must be alphanumeric." });
	} else {
		req.body.username = body.username.trim();
		req.body.password = body.password.trim();
		next();
	}
};

const restricted = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		res
			.status(401)
			.json({ message: "Token required or user must be logged in." });
	} else {
		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: err });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	}
};

const checkUsernameExists = async (req, res, next) => {
	const username = req.body.username;
	const [userFound] = await Users.getUserBy({ username: username });
	if (userFound) {
		next();
	} else {
		res.status(401).json({ message: "Username doesn't exist." });
	}
};

const checkUsernameAvailable = async (req, res, next) => {
	const username = req.body.username;
	const [userFound] = await Users.getUserBy({ username: username });
	if (userFound) {
		res.status(401).json({ message: "Username already taken." });
	} else {
		next();
	}
};

const validateUserId = async (req, res, next) => {
	const { id } = req.params;
	Users.getUserById(id)
		.then((user) => {
			if (user.length === 0) {
				res.status(404).json({ message: "User with that ID not found." });
			} else {
				next();
			}
		})
		.catch(next);
};

module.exports = {
	restricted,
	checkUsernameAvailable,
	checkUsernameExists,
	validateCredentials,
	validateUserId,
};
