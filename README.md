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
food_name: "string
}

returns a list of all the foods to bring in the potluck

### GET array of all the foods to bring in the potluck

/potlucks/:id/foods
