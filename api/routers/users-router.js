/* eslint-disable no-unused-vars */
const router = require("express").Router();
const Users = require("../models/users-model");
const Potlucks = require("../models/potlucks-model");
const Middleware = require("../middlewares/auth-middleware");
const bcrypt = require("bcryptjs");
const tokenBuilder = require("../utils/token-builder");

router.get("/", (req, res, next) => {
	Users.getAllUsers()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch(next);
});

router.get("/:id", Middleware.validateUserId, (req, res, next) => {
	const { id } = req.params;
	Users.getUserById(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch(next);
});

router.put(
	"/:id",
	Middleware.validateUserId,
	Middleware.validateCredentials,
	(req, res, next) => {
		const { id } = req.params;
		const body = req.body;

		const rounds = process.env.BCRYPT_ROUNDS || 8;
		const hash = bcrypt.hashSync(body.password, rounds);
		body.password = hash;

		Users.updateUserById(id, body)
			.then((updatedUser) => {
				res.status(200).json(updatedUser);
			})
			.catch(next);
	},
);

// delete user
router.get("/:id/joined-potlucks", (req, res, next) => {
	const { id } = req.params;
	Potlucks.getPotlucksToAttendByUser(id)
		.then((potlucks) => {
			res.status(200).json(potlucks);
		})
		.catch(next);
});

router.get("/:id/hosted-potlucks", (req, res, next) => {
	const { id } = req.params;
	Potlucks.getOrganizedPotluckByUser(id)
		.then((potlucks) => {
			res.status(200).json(potlucks);
		})
		.catch(next);
});

module.exports = router;
