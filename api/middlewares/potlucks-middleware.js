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
		res.status(400).json({ message: "Text field required." });
	} else {
		req.body.food_name = body.food_name.trim();
		next();
	}
};

const validateJoinAsGuestData = async (req, res, next) => {
	const { id } = req.params;
	const body = req.body; //guest: state.user_id

	if (!body || Object.keys(body).length === 0) {
		res.status(400).json({ message: "User required." });
	} else {
		Potlucks.getPotluckGuestsById(id)
			.then((potluckList) => {
				//potluckList returns an array of user data attending to the potluck.
				// checks if user exist in the array
				const found = potluckList.some((data) => data.user_id === body.guest);
				if (found) {
					res.status(400).json({ message: "User already a guest." });
				} else {
					next();
				}
			})
			.catch(next);
	}
};

module.exports = {
	validatePotluckData,
	validatePotluckId,
	validateFoodData,
	validateJoinAsGuestData,
};
