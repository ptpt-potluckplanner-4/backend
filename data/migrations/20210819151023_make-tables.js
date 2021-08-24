exports.up = function (knex) {
	return knex.schema
		.createTable("users", (users) => {
			users.increments("user_id");
			users.string("name").notNullable();
			users.string("username").notNullable().unique();
			users.string("password").notNullable();
		})
		.createTable("potlucks", (potlucks) => {
			potlucks.increments("potluck_id");
			potlucks.string("title").notNullable();
			potlucks.string("date").notNullable();
			potlucks.string("time").notNullable();
			potlucks.string("location").notNullable();
			potlucks
				.integer("organizer") //organizer user id refers to user_id
				.unsigned()
				.notNullable()
				.references("user_id")
				.inTable("users")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})
		.createTable("foods", (foods) => {
			foods.increments("food_id");
			foods.string("food_name").notNullable();
		})
		.createTable("potluck_foods", (potluckFoods) => {
			potluckFoods.increments("potluckFood_id");
			potluckFoods
				.integer("potluck_id") //which potluck event
				.unsigned()
				.notNullable()
				.references("potluck_id")
				.inTable("potlucks")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			potluckFoods
				.integer("food_id") //what food
				.unsigned()
				.notNullable()
				.references("food_id")
				.inTable("foods")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			potluckFoods
				.integer("contributor") //who brings this food. refers to user_id
				.unsigned()
				.references("user_id")
				.inTable("users")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})
		.createTable("potluck_guests", (potluckGuests) => {
			potluckGuests.increments("potluckGuest_id");
			potluckGuests
				.integer("potluck_id") //which potluck event
				.unsigned()
				.notNullable()
				.references("potluck_id")
				.inTable("potlucks")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			potluckGuests
				.integer("guest") //the attendee or guest
				.unsigned()
				.references("user_id")
				.inTable("users")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("potluck_guests")
		.dropTableIfExists("potluck_foods")
		.dropTableIfExists("foods")
		.dropTableIfExists("potlucks")
		.dropTableIfExists("users");
};
