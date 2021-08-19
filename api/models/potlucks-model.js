const db = require("../../data/config-db");

const getAllPotlucks = () => {
	return db("potlucks as p")
		.select(
			"potluck_id",
			"title",
			"date",
			"time",
			"location",
			"u.name as organizer",
		)
		.join("users as u", "p.organizer", "u.user_id")
		.orderBy("potluck_id");
};

const getPotluckByFilter = (filter) => {
	return db("potlucks").where(filter).orderBy("potluck_id");
};

const getPotluckById = (potluck_id) => {
	return db("potlucks").where({ potluck_id }).orderBy("potluck_id");
};

const addPotluck = async (newPotluck) => {
	/* requires obj with properties:
    {
        title: "string",
        date: "string",
        time: "string",
        location: "string",
        organizer: state.user_id
    }
    */

	const [potluck_id] = await db("potlucks").insert(newPotluck);
	const newlyAdded = await getPotluckById(potluck_id);
	return newlyAdded;
};

//get all foods for a potluck
//get all members of a potluck
//get user details including potlucks to attend

//claim (post) a food to potluck event using state.user_id
//join (post) a potluck event using state.user_id

//get complete details per potluck events including foods and members
//update and delete potluck info

module.exports = {
	getAllPotlucks,
	getPotluckByFilter,
	getPotluckById,
	addPotluck,
};
