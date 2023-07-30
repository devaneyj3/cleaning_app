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
		const data = await db.addData("employee", req.body);
		console.log(data.employee);
		res
			.status(201)
			.json({ employee: data, message: `Creating employee ${req.body.name}` });
	} catch (error) {
		console.log(error);
	}
});

router.put("/:id/edit", (req, res) => {
	const { id } = req.params;
	res.status(200).json({ employee: req.body, message: "Editing Employees" });
});

router.delete("/:id/delete", (req, res) => {
	const { id } = req.params;
	res.status(200).json({ employee: req.body, message: "Deleting Employees" });
});

// Export the router
module.exports = router;
