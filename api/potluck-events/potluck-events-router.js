/* eslint-disable no-unused-vars */
const router = require("express").Router();

router.get("/", (req, res, next) => {
	res.json({ message: "potluck-events router working" });
});

module.exports = router;
