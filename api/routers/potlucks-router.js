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

router.post("/create", (req, res, next) => {
	const body = req.body;
	Potlucks.addPotluck(body)
		.then((newPotluck) => {
			res.status(201).json(newPotluck);
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

router.get("/:id/foods", (req, res, next) => {
	const { id } = req.params;
	Potlucks.getFoodsById(id)
		.then((foods) => {
			res.status(200).json(foods);
		})
		.catch(next);
});

router.delete("/:id/foods/:potluckFood_id", (req, res, next) => {
	const { id } = req.params;
	const { potluckFood_id } = req.params;
	Potlucks.removeFood(id, potluckFood_id)
		.then((newFood) => {
			res.status(200).json(newFood);
		})
		.catch(next);
});

router.get("/:id/foods/:potluckFood_id", (req, res, next) => {
	const { id } = req.params;
	const { potluckFood_id } = req.params;
	Potlucks.getPotluckFoodById(potluckFood_id)
		.then((food) => {
			res.status(200).json(food);
		})
		.catch(next);
});

router.put("/:id/foods/:potluckFood_id", (req, res, next) => {
	const { potluckFood_id } = req.params;
	const body = req.body;

	//body requires: {contributor: state.user_id}
	Potlucks.claimFood(potluckFood_id, body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch(next);
});

router.get("/:id/guests", (req, res, next) => {
	const { id } = req.params;
	Potlucks.getPotluckGuestsById(id)
		.then((guests) => {
			res.status(200).json(guests);
		})
		.catch(next);
});

router.post("/:id/guests", (req, res, next) => {
	const { id } = req.params;

	//body requires: { guest: state_user.id }
	const body = req.body;

	Potlucks.joinPotluck(id, body.guest)
		.then((response) => {
			res.json(response);
		})
		.catch(next);
});

//update
//delete food
//delete the potluck

module.exports = router;
