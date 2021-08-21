/* eslint-disable no-unused-vars */
const router = require("express").Router();
const Users = require("../models/users-model");
const bcrypt = require("bcryptjs");
const tokenBuilder = require("../utils/token-builder");

router.post("/register", (req, res, next) => {
	const credentials = req.body;
	const rounds = process.env.BCRYPT_ROUNDS;
	const hash = bcrypt.hashSync(credentials.password, rounds);
	credentials.password = hash;

	Users.addUser(credentials)
		.then((newUser) => {
			res.status(201).json({ message: "Success! User created. Please login." });
		})
		.catch(next);
});

router.post("/login", async (req, res, next) => {
	const { username, password } = req.body;
	const [user] = await Users.getUserBy({ username: username });

	if (user && !bcrypt.compareSync(password, user.password)) {
		res.status(401).json({ message: "Incorrect password" });
	} else if (user && bcrypt.compareSync(password, user.password)) {
		const token = tokenBuilder(user);
		res.json({
			user,
			token,
		});
	} else {
		next();
	}
});

module.exports = router;
