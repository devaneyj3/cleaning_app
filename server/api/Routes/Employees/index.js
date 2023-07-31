const express = require("express");
const db = require("../../db_model");
const router = express.Router();

// Define routes
router.get("/", async (req, res) => {
	try {
		const data = await db.getFromDB("employee");
		res.status(200).json({ employee: data, message: "Getting Employees" });
	} catch (error) {
		console.log(error);
	}
});

router.post("/", async (req, res) => {
	try {
		await db.addData("employee", req.body);
		const data = await db.getFromDB("employee");
		res.status(201).json({
			newEmployee: req.body,
			employees: data,
			message: `Creating employee ${req.body.name}`,
		});
	} catch (error) {
		console.log(error);
	}
});

router.put("/:id/edit", async (req, res) => {
	const { id } = req.params;
	try {
		await db.edit("employee", id, req.body);
		const data = await db.getFromDB("employee");
		res.status(200).json({ employees: data, message: "Editing Employees" });
	} catch (error) {
		console.log(error);
	}
});

router.delete("/:id/delete", async (req, res) => {
	const { id } = req.params;
	try {
		await db.deleteByID("employee", id);
		res.status(200).json({ id: id, message: "Deleting Employee" });
	} catch (error) {
		console.log(error);
	}
});

// Export the router
module.exports = router;
