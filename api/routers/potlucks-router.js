/* eslint-disable no-unused-vars */
const router = require("express").Router();
const Potlucks = require("../models/potlucks-model");

router.get("/", (req, res, next) => {
	Potlucks.getAllPotlucks()
		.then((potlucks) => {
			res.status(200).json(potlucks);
		})
		.catch(next);
});

router.get("/:id", (req, res, next) => {
	const { id } = req.params;
	Potlucks.getPotluckById(id)
		.then((potluck) => {
			res.status(200).json(potluck);
		})
		.catch(next);
});

router.post("/create", (req, res, next) => {
	const body = req.body;
	Potlucks.addPotluck(body)
		.then((newPotluck) => {
			res.status(201).json(newPotluck);
		})
		.catch(next);
});

//update
//delete

module.exports = router;
