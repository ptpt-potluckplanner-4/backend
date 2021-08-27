/* eslint-disable no-unused-vars */
const router = require("express").Router();
const Users = require("../models/users-model");
const bcrypt = require("bcryptjs");
const tokenBuilder = require("../utils/token-builder");
const Middleware = require("../middlewares/auth-middleware");

router.post(
	"/register",
	Middleware.validateCredentials,
	Middleware.checkUsernameAvailable,
	(req, res, next) => {
		const credentials = req.body;
		const rounds = process.env.BCRYPT_ROUNDS || 8;
		const hash = bcrypt.hashSync(credentials.password, rounds);
		credentials.password = hash;

		Users.addUser(credentials)
			.then((newUser) => {
				res
					.status(201)
					.json({ message: "Success! User created. Please login." });
			})
			.catch(next);
	},
);

router.post(
	"/login",
	Middleware.validateCredentials,
	Middleware.checkUsernameExists,
	async (req, res, next) => {
		const { username, password } = req.body;
		const [user] = await Users.getUserBy({ username: username });

		if (user && !bcrypt.compareSync(password, user.password)) {
			res.status(401).json({ message: "Incorrect password" });
		} else if (user && bcrypt.compareSync(password, user.password)) {
			const token = tokenBuilder(user);
			res.status(200).json({
				message: `Welcome ${user.name}!`,
				user_id: `${user.user_id}`,
				token,
			});
		} else {
			next();
		}
	},
);

//delete user endpoint
//!need to add error handler on routers

module.exports = router;
