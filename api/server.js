/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const server = express();

const usersRouter = require("./routers/users-router");
const potluckEventsRouter = require("./routers/potlucks-router");
const authRouter = require("./routers/auth-router");

server.use(morgan("dev"));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/users", usersRouter);
server.use("/potlucks", potluckEventsRouter);
server.use("/auth", authRouter);

//root
server.get("/", (req, res) => {
	res.send(
		`<h2> Welcome to potluck-planner API homepage! </h2>
		<p> Please read the <a href="https://github.com/ptpt-potluckplanner-4/backend/blob/main/README.md"> docs </a> </p>`,
	);
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
