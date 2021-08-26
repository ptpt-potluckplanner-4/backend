exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("foods")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("foods").insert([
				{ food_name: "Big tuna fish sandwiches" },
				{ food_name: "C-shaped bagels" },
				{ food_name: "Beet & Goat Cheese salad" },
				{ food_name: "Chicken breast, hold the chicken" },
				{ food_name: "George Forman grilled bacon" },
				{ food_name: "Soft pretzels with 30 toppings" },
				{ food_name: "Pigs in a blanket in a blanket" },
				{ food_name: "Kevin's famous chilli" },
				{ food_name: "Stapler jell-o" },
				{ food_name: "Scotch with Splenda" },
			]);
		});
};
