# Welcome to Potluck Planner API

# USER endpoints

## create a user

`[POST] https://potluck-planner-04.herokuapp.com/auth/register`

requires object notNullable: `{ name: "string", username: "string", password: "string" }`

returns the user info

## login to account

`[POST] https://potluck-planner-04.herokuapp.com/auth/login`

requires object notNullable: `{ username: "string", password: "string" }`

returns the user info and token

## get all users

` [GET] https://potluck-planner-04.herokuapp.com/users`

# POTLUCK endpoints

## get all potluck events

`[GET] https://potluck-planner-04.herokuapp.com/potlucks`

## get potluck event by id

`[GET] https://potluck-planner-04.herokuapp.com/potlucks/:id`

## create a new potluck event

`[POST] https://potluck-planner-04.herokuapp.com/potlucks/create`

requires this object notNullable and user must be logged in: `{ title: "string", date: "string", time: "string", location: "string", organizer: state.user_id }`

# POTLUCK-FOODS endpoints

## create a food for the potluck

`[POST] https://potluck-planner-04.herokuapp.com/potlucks/:id/foods`

requires this object notNullable and user must be logged in: `{ food_name: "string" }`

returns a list of all the foods to bring in the potluck

## delete a food in the potluck array of foods

`[DELETE] https://potluck-planner-04.herokuapp.com/potlucks/:id/foods/:potluckFood_id`

returns the list of all the foods to bring in the potluck without the deleted food

only possible if you're the organizer. non-organizer of the potluck cannot remove the food

## get array of all the foods to bring in the potluck

`[GET] https://potluck-planner-04.herokuapp.com/potlucks/:id/foods`

## set your name as contributor of food from the list

`[PUT] https://potluck-planner-04.herokuapp.com/potlucks/:id/foods/:potluckFood_id`

the user must be logged in and they can only claim food as theirs to bring, they cant put other people's name

requires object: `{ contributor: state.user_id }`

returns updated object of that item `{ "potluckFood_id": 7, "food_name": "baked potatoes", "contributor": "Name of user" }`

# POTLUCK-GUESTS endpoints

## get array of all guests coming to potluck

`[GET] https://potluck-planner-04.herokuapp.com/potlucks/:id/guests`

## join potluck event

`[POST] https://potluck-planner-04.herokuapp.com/potlucks/:id/guests`

requires object: `{"guest": state.user_id}`

returns an array of guests coming to the potluck
