exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("potlucks")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("potlucks").insert([
				{
					title: "Fall Welcoming",
					date: "September 29, 2021",
					time: "8:00 AM",
					location: "Schrute Farms",
					organizer: 2,
				},
				{
					title: "Winter Wonderparty",
					date: "November 30, 2021",
					time: "9:00 AM",
					location: "Michael and Jan's",
					organizer: 1,
				},
				{
					title: "Potluck & Karaoke",
					date: "October 30, 2021",
					time: "5:00 PM",
					location: "Jim Halpert's",
					organizer: 4,
				},
			]);
		});
};
