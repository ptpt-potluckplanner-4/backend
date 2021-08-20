/* eslint-disable no-unused-vars */
const router = require("express").Router();
const Users = require("../models/users-model");

router.post("/", (req, res, next) => {
	const body = req.body;

	Users.addUser(body)
		.then((newUser) => {
			res.status(201).json(newUser);
		})
		.catch(next);
});

module.exports = router;
