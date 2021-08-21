const db = require("../../data/config-db");

const getAllUsers = () => {
	return db("users").orderBy("user_id");
};

//register, login, edit, and delete a user will be in auth-router

const getUserBy = (filter) => {
	return db("users").where(filter);
};

const getUserById = (user_id) => {
	return db("users").where({ user_id });
};

const addUser = async (newUser) => {
	const user_id = await db("users").returning("user_id").insert(newUser);
	const newlyAddedUser = await getUserById(user_id[0]);
	return newlyAddedUser;
};

module.exports = {
	getAllUsers,
	getUserById,
	getUserBy,
	addUser,
};
