const db = require("../../data/config-db");

const getAllUsers = () => {
	return db("users").orderBy("user_id");
};

//register, login, edit, and delete a user will be in auth-router

const getUserById = (user_id) => {
	return db("users").where({ user_id });
};

const addUser = async (newUser) => {
	// const [user_id] = await db("users").insert(newUser);
	// const newlyAddedUser = await getUserById(user_id);
	// return newlyAddedUser;

	const added = await db("users").returning("user_id").insert(newUser);
	return added;
};

module.exports = {
	getAllUsers,
	getUserById,
	addUser,
};
