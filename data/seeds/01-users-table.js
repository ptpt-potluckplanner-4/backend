exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("users")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("users").insert([
				{ name: "Michael Scott", username: "michael", password: "1234" },
				{ name: "Dwight Schrute", username: "dwight", password: "1234" },
				{ name: "Pam Beesly", username: "pam", password: "1234" },
				{ name: "Jim Halpert", username: "jim", password: "1234" },
				{ name: "Andy Bernard", username: "andy", password: "1234" },
			]);
		});
};
