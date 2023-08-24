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
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const data = await db.findByID("employee", id);
		res.status(200).json({ employee: data });
	} catch (error) {
		console.log(error);
	}
});

router.post("/", async (req, res) => {
	try {
		const newEmployee = await db.addData("employee", req.body);
		const employees = await db.getFromDB("employee");
		res.status(201).json({
			newEmployee: newEmployee,
			employees: employees,
			message: `Creating employee ${req.body.Name}`,
		});
	} catch (error) {
		console.log(error);
	}
});

router.put("/:id/edit", async (req, res) => {
	const { id } = req.params;
	try {
		const updatedEmployee = await db.edit("employee", id, req.body);
		const data = await db.getFromDB("employee");
		res.status(200).json({
			updatedEmployee: updatedEmployee,
			employees: data,
			message: "Editing Employees",
		});
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
