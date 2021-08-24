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
		.first();
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
	const potluck_id = await db("potlucks")
		.returning("potluck_id")
		.insert(newPotluck);

	const newlyCreatedPotluck = await getPotluckById(potluck_id[0]);
	return newlyCreatedPotluck;
};

//food list per potluck
const getFoodsById = async (potluck_id) => {
	return db("potluck_foods as pf")
		.select("pf.potluckFood_id", "f.food_name", "u.name as contributor")
		.leftJoin("foods as f", "f.food_id", "pf.food_id")
		.leftJoin("potlucks as p", "p.potluck_id", "pf.potluck_id")
		.leftJoin("users as u", "pf.contributor", "u.user_id")
		.where("pf.potluck_id", potluck_id)
		.orderBy("pf.food_id");
};

const createFood = async (potluck_id, food) => {
	const food_id = await db("foods").returning("food_id").insert(food);
	// eslint-disable-next-line no-unused-vars
	const potluckFood_id = await db("potluck_foods")
		.returning("potluckFood_id")
		.insert({
			potluck_id: potluck_id,
			food_id: food_id[0],
		});
	const foodListByPotluckId = await getFoodsById(potluck_id);
	return foodListByPotluckId;
};

const getPotluckFoodById = (potluckFood_id) => {
	return db("potluck_foods as pf")
		.select("pf.potluckFood_id", "food_name", "u.name as contributor")
		.leftJoin("foods as f", "f.food_id", "pf.food_id")
		.leftJoin("potlucks as p", "p.potluck_id", "pf.potluck_id")
		.leftJoin("users as u", "pf.contributor", "u.user_id")
		.where("pf.potluckFood_id", potluckFood_id)
		.orderBy("pf.food_id");
};
const claimFood = async (potluckFood_id, contributor) => {
	// eslint-disable-next-line no-unused-vars
	const claim = await db("potluck_foods as pf")
		.select("pf.potluckFood_id", "food_name", "u.name as contributor")
		.leftJoin("foods as f", "f.food_id", "pf.food_id")
		.leftJoin("potlucks as p", "p.potluck_id", "pf.potluck_id")
		.leftJoin("users as u", "pf.contributor", "u.user_id")
		.where("pf.potluckFood_id", potluckFood_id)
		.update(contributor)
		.orderBy("pf.food_id");
	const getPotluckFoods = await getPotluckFoodById(potluckFood_id);
	return getPotluckFoods;
};

//guests per potluck
const getPotluckGuestsById = (potluck_id) => {
	return db("potluck_guests as pg")
		.select("pg.potluckGuest_id", "pg.potluck_id", "u.user_id", "u.name")
		.leftJoin("users as u", "pg.guest", "u.user_id")
		.where("potluck_id", potluck_id)
		.orderBy("u.user_id");
};
const joinPotluck = async (potluck_id, user_id) => {
	// eslint-disable-next-line no-unused-vars
	const join = await db("potluck_guests as pg")
		.select("pg.potluckGuest_id", "pg.potluck_id", "u.user_id", "u.name")
		.join("users as u", "pg.guest", "u.user_id")
		.insert({
			potluck_id: potluck_id,
			guest: user_id,
		});

	const potluckGuests = await getPotluckGuestsById(potluck_id);
	return potluckGuests;
};

const getPotlucksToAttendByUser = (user_id) => {};
const getOrganizedPotluckByUser = (user_id) => {};

const deletePotluckById = (potluck_id) => {};

//get user details including potlucks to attend and potluck organized
//get complete details per potluck events including foods and members
//update and delete potluck info

module.exports = {
	getAllPotlucks,
	getPotluckByFilter,
	getPotluckById,
	addPotluck,
	getFoodsById,
	createFood,
	getPotluckFoodById,
	claimFood,
	getPotluckGuestsById,
	joinPotluck,
};
