exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("users")
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex("users").insert([
				{ name: "Bob the White Cat", username: "bob", password: "1234" },
				{ name: "Art the Black Cat", username: "art", password: "1234" },
			]);
		});
};
