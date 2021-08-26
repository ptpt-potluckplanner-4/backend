/* eslint-disable no-unused-vars */
const router = require("express").Router();
const Potlucks = require("../models/potlucks-model");
const Middleware = require("../middlewares/potlucks-middleware");

//get all potlucks
router.get("/", (req, res, next) => {
	Potlucks.getAllPotlucks()
		.then((potlucks) => {
			res.status(200).json(potlucks);
		})
		.catch(next);
});

//create potluck
router.post("/create", Middleware.validatePotluckData, (req, res, next) => {
	const body = req.body;
	Potlucks.addPotluck(body)
		.then((newPotluck) => {
			res.status(201).json(newPotluck);
		})
		.catch(next);
});

//get potluck by id
router.get("/:id", Middleware.validatePotluckId, (req, res, next) => {
	const { id } = req.params;
	Potlucks.getPotluckById(id)
		.then((potluck) => {
			res.status(200).json(potluck);
		})
		.catch(next);
});

//get potluck foods by potluck id
router.get("/:id/foods", Middleware.validatePotluckId, (req, res, next) => {
	const { id } = req.params;
	Potlucks.getFoodsById(id)
		.then((foods) => {
			res.status(200).json(foods);
		})
		.catch(next);
});

//remove a food
router.delete(
	"/:id/foods/:potluckFood_id",
	Middleware.validatePotluckId,
	(req, res, next) => {
		const { id } = req.params;
		const { potluckFood_id } = req.params;
		Potlucks.removeFood(id, potluckFood_id)
			.then((newFood) => {
				res.status(200).json(newFood);
			})
			.catch(next);
	},
);

//get a specific food from array of potluck foods
router.get(
	"/:id/foods/:potluckFood_id",
	Middleware.validatePotluckId,
	(req, res, next) => {
		const { id } = req.params;
		const { potluckFood_id } = req.params;
		Potlucks.getPotluckFoodById(potluckFood_id)
			.then((food) => {
				res.status(200).json(food);
			})
			.catch(next);
	},
);

//claim food from the list as your contribution
router.put(
	"/:id/foods/:potluckFood_id",
	Middleware.validatePotluckId,
	Middleware.validateFoodData,
	(req, res, next) => {
		const { potluckFood_id } = req.params;
		const body = req.body;

		//body requires: {contributor: state.user_id}
		Potlucks.claimFood(potluckFood_id, body)
			.then((response) => {
				res.status(200).json(response);
			})
			.catch(next);
	},
);

//get list of potluck guests by id
router.get("/:id/guests", Middleware.validatePotluckId, (req, res, next) => {
	const { id } = req.params;
	Potlucks.getPotluckGuestsById(id)
		.then((guests) => {
			res.status(200).json(guests);
		})
		.catch(next);
});

//add yourself to list of guests of potluck
router.post(
	"/:id/guests",
	Middleware.validatePotluckId,
	Middleware.validateJoinAsGuestData,
	(req, res, next) => {
		const { id } = req.params;

		//body requires: { guest: state_user.id }
		const body = req.body;

		Potlucks.joinPotluck(id, body.guest)
			.then((response) => {
				res.status(200).json(response);
			})
			.catch(next);
	},
);

//update potluck details
//delete the potluck

module.exports = router;
