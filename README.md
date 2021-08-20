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
