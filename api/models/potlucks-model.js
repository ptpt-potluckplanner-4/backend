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
		.where(filter)
		.orderBy("potluck_id");
};

const getPotluckById = (potluck_id) => {
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
		.where({ potluck_id })
		.orderBy("potluck_id");
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
	const newlyCreatedPotluck = await getPotluckById(potluck_id);
	return newlyCreatedPotluck;
};

//food list per potluck
const getFoodsById = async (potluck_id) => {
	return db("potluck_foods as pf")
		.select("pf.potluck_id", "pf.food_id", "food_name", "contributor")
		.leftJoin("foods as f", "f.food_id", "pf.food_id")
		.leftJoin("potlucks as p", "p.potluck_id", "pf.potluck_id")
		.where("pf.potluck_id", potluck_id)
		.orderBy("pf.food_id");
};

//create a food for a potluck
const createFood = async (potluck_id, food) => {
	const [food_id] = await db("foods").insert(food);
	const [potluckFood_id] = await db("potluck_foods").insert({
		potluck_id: potluck_id,
		food_id: food_id,
	});
	const foodListByPotluckId = await getFoodsById(potluck_id);
	return foodListByPotluckId;
};

//claim a food for a potluck

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
	getFoodsById,
	createFood,
};
