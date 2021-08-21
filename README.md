## Welcome to Potluck Planner API

### POST create a user

`[POST] https://potluck-planner-04.herokuapp.com/auth`

requires object notNullable: `{ name: "string", username: "string", password: "string" }`

returns the user info

### GET all users

` [GET] https://potluck-planner-04.herokuapp.com/users`

### GET all potluck events

`[GET] https://potluck-planner-04.herokuapp.com/potlucks`

### GET potluck event by id

`[GET] https://potluck-planner-04.herokuapp.com/potlucks/:id`

### POST create a new potluck event

`[POST] https://potluck-planner-04.herokuapp.com/potlucks/create`

requires this object notNullable and user must be logged in: `{ title: "string", date: "string", time: "string", location: "string", organizer: state.user_id }`

### POST create a food for the potluck

`[POST] https://potluck-planner-04.herokuapp.com/potlucks/:id/foods`

requires this object notNullable and user must be logged in: `{ food_name: "string" }`

returns a list of all the foods to bring in the potluck

### GET array of all the foods to bring in the potluck

`[GET] https://potluck-planner-04.herokuapp.com/potlucks/:id/foods`

### PUT set your name as contributor of food from the list

`[PUT] https://potluck-planner-04.herokuapp.com/:id/foods/:potluckFood_id`

the user must be logged in and they can only claim food as theirs to bring, they cant put other people's name

requires object: `{ contributor: state.user_id }`

returns updated object of that item `{ "potluckFood_id": 7, "food_name": "baked potatoes", "contributor": "Name of user" }`
