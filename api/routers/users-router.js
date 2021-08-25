/* eslint-disable no-unused-vars */
const router = require("express").Router();
const Users = require("../models/users-model");
const Potlucks = require("../models/potlucks-model");

router.get("/", (req, res, next) => {
	Users.getAllUsers()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch(next);
});

//! need to add get user by id, edit user info, delete user

router.get("/:id/potlucks", (req, res, next) => {
	const { id } = req.params;
	Potlucks.getPotlucksToAttendByUser(id)
		.then((potlucks) => {
			res.json(potlucks);
		})
		.catch(next);
});

module.exports = router;
