const db = require("../../data/config-db");

const getAllUsers = () => {
	return db("users").orderBy("user_id");
};

//register, login, edit, and delete a user will be in auth-router

module.exports = {
	getAllUsers,
};
