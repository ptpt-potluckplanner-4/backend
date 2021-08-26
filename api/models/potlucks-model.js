/* eslint-disable no-unused-vars */

const db = require("../../data/config-db");

//get all potlucks
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

//get potluck by filter
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

//get potluck by id
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

//create potluck
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

//create food for potluck
const createFood = async (potluck_id, food) => {
	const food_id = await db("foods").returning("food_id").insert(food);
	const potluckFood_id = await db("potluck_foods")
		.returning("potluckFood_id")
		.insert({
			potluck_id: potluck_id,
			food_id: food_id[0],
		});
	const foodListByPotluckId = await getFoodsById(potluck_id);
	return foodListByPotluckId;
};

//remove food
const removeFood = async (potluck_id, potluckFood_id) => {
	const deleteFood = await db("potluck_foods")
		.returning("potluckFood_id")
		.where({ potluckFood_id })
		.del();
	const foodListByPotluckId = await getFoodsById(potluck_id);
	return foodListByPotluckId;
};

//get the array of foods in potluck
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

// get array of guests in potluck
const getPotluckGuestsById = (potluck_id) => {
	return db("potluck_guests as pg")
		.select("pg.potluckGuest_id", "pg.potluck_id", "u.user_id", "u.name")
		.leftJoin("users as u", "pg.guest", "u.user_id")
		.where("potluck_id", potluck_id)
		.orderBy("u.user_id");
};

//join potluck event
const joinPotluck = async (potluck_id, user_id) => {
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

// get all potlucks user is attending
const getPotlucksToAttendByUser = (user_id) => {
	return db("potluck_guests as pg")
		.select("p.*", "u.name as organizer")
		.leftJoin("potlucks as p", "pg.potluck_id", "p.potluck_id")
		.leftJoin("users as u", "p.organizer", "u.user_id")
		.where("guest", user_id);
};

//get all potlucks user is hosting
const getOrganizedPotluckByUser = (user_id) => {
	return db("potlucks as p")
		.select("p.*")
		.join("users as u", "p.organizer", "u.user_id")
		.where("p.organizer", user_id);
};

// const deletePotluckById = (potluck_id) => {};
const updatePotluckData = async (potluck_id, body) => {
	const potluckId = await db("potlucks")
		.returning("potluck_id")
		.where({ potluck_id })
		.update(body);
	const updatedPotluckData = await getPotluckById(potluck_id);
	return updatedPotluckData;
};

module.exports = {
	getAllPotlucks,
	getPotluckByFilter,
	getPotluckById,
	addPotluck,
	getFoodsById,
	createFood,
	removeFood,
	getPotluckFoodById,
	claimFood,
	getPotluckGuestsById,
	joinPotluck,
	getPotlucksToAttendByUser,
	getOrganizedPotluckByUser,
	updatePotluckData,
};
