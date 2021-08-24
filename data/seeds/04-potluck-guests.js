exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("potluck_guests")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("potluck_guests").insert([
				{ potluck_id: 1, guest: 1 },
				{ potluck_id: 1, guest: 2 },
				{ potluck_id: 1, guest: 3 },
				{ potluck_id: 1, guest: 4 },
				{ potluck_id: 1, guest: 5 },
				{ potluck_id: 2, guest: 1 },
				{ potluck_id: 2, guest: 2 },
				{ potluck_id: 3, guest: 1 },
				{ potluck_id: 3, guest: 2 },
				{ potluck_id: 3, guest: 3 },
				{ potluck_id: 3, guest: 4 },
				{ potluck_id: 3, guest: 5 },
			]);
		});
};
