## Welcome to Potluck Planner API

### GET all users

/users

### GET all potluck events

/potlucks

### GET potluck event by id

/potlucks/:id

### POST create a new potluck event

/potlucks/create

requires an object notNullable and user must be logged in

{
title: "string",
date: "string",
time: "string",
location: "string",
organizer: state.user_id
}

### POST create a food for the potluck

/potlucks/:id/foods

requires {
food_name: "string"
}

returns a list of all the foods to bring in the potluck

### GET array of all the foods to bring in the potluck

/potlucks/:id/foods

### PUT set your name as contributor of food from the list

/:id/foods/:potluckFood_id

the user must be logged in and they can only claim food as theirs to bring, they cant put other people's name

requires object {
contributor: state.user_id
}

returns updated object of that item {
"potluckFood_id": 7,
"food_name": "baked potatoes",
"contributor": "Name of user"
}
