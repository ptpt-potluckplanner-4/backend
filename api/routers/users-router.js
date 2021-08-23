/* eslint-disable no-unused-vars */
const router = require("express").Router();
const Users = require("../models/users-model");

router.get("/", (req, res, next) => {
	Users.getAllUsers()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch(next);
});

//! need to add get user by id, edit user info, delete user

module.exports = router;
