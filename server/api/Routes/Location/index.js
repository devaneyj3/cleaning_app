const express = require("express");
const router = express.Router();
const db = require("../../db_model");

// Define routes
router.get("/", async (req, res) => {
	try {
		const data = await db.getFromDB("location");
		res.status(200).json({ locations: data, message: "Getting locations" });
	} catch (error) {
		console.log(error);
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const data = await db.findByID("location", id);
		res.status(200).json({ location: data });
	} catch (error) {
		console.log(error);
	}
});

router.post("/", async (req, res) => {
	try {
		await db.addData("location", req.body);
		const data = await db.getFromDB("location");
		res.status(201).json({
			newlocation: req.body,
			locations: data,
			message: `Creating location ${req.body.name}`,
		});
	} catch (error) {
		console.log(error);
	}
});

router.put("/:id/edit", async (req, res) => {
	const { id } = req.params;
	try {
		await db.edit("location", id, req.body);
		const data = await db.getFromDB("location");
		res.status(200).json({ locations: data, message: "Editing locations" });
	} catch (error) {
		console.log(error);
	}
});

router.delete("/:id/delete", async (req, res) => {
	const { id } = req.params;
	try {
		await db.deleteByID("location", id);
		res.status(200).json({ id: id, message: "Deleting location" });
	} catch (error) {
		console.log(error);
	}
});

// Export the router
module.exports = router;
