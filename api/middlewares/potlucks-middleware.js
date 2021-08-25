const Potlucks = require("../models/potlucks-model");

const validatePotluckData = (req, res, next) => {
	const body = req.body;

	if (!body || Object.keys(body).length === 0) {
		res.status(400).json({ message: "Text fields required." });
	} else if (!body.title) {
		res.status(400).json({ message: "Title required." });
	} else if (!body.date || !body.time) {
		res.status(400).json({ message: "Date and time required." });
	} else if (!body.location) {
		res.status(400).json({ message: "Location required." });
	} else if (!body.organizer) {
		res.status(400).json({ message: "Organizer (user_id) required." });
	} else {
		req.body.title = body.title.trim();
		req.body.location = body.location.trim();
		next();
	}
};

const validatePotluckId = (req, res, next) => {
	const { id } = req.params;
	Potlucks.getPotluckById(id)
		.then((potluck) => {
			if (!potluck) {
				res.status(404).json({ message: "No potluck found with that id." });
			} else {
				next();
			}
		})
		.catch(next);
};

const validateFoodData = (req, res, next) => {
	const body = req.body;
	if (!body || Object.keys(body).length === 0) {
		res.status(400).json({ message: "Food name required." });
	} else {
		req.body.food_name = body.food_name.trim();
		next();
	}
};

const validatePotluckFoodId = () => {
	//check if food exists in db
};

const validateJoinAsGuestData = () => {
	//make sure user that has joined the potluck cant join again (unique)
};

//make sure user_id to add into potluck event is an integer or number and NOT a string

module.exports = {
	validatePotluckData,
	validatePotluckId,
	validateFoodData,
};
