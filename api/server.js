/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const server = express();

const usersRouter = require("./users/users-router");
const potluckEventsRouter = require("./potluck-events/potluck-events-router");

server.use(morgan("dev"));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/users", usersRouter);
server.use("/potluck-events", potluckEventsRouter);

//root
server.get("/", (req, res) => {
	res.send(`<h2> welcome to potluck-planner API homepage! </h2>`);
});

// catch all
server.use("*", (req, res) => {
	res.status(404).json({ message: "oops! that place doesn't exist!" });
});

// error handler
server.use((err, req, res, next) => {
	const message = err?.message || "something went wrong in the server";
	const status = err?.status || 500;

	res.status(`${status}`).json({ message, stack: err.stack });
});

module.exports = server;
