const express = require("express");
const db = require("./employee_locations_model");
const router = express.Router();

//EMPLOYEE GETS ASSISNED A LOCATION
router.post("/:id/locations/:locationID", async (req, res) => {
	const { id } = req.params;
	const { locationID } = req.params;
	try {
		await db.addLocationToEmployee(id, locationID);
		res
			.status(201)
			.json({ message: `Location ID: ${locationID} successfully added` });
	} catch (error) {
		console.log(error);
	}
});

//get individual employees locations
router.get("/:id/locations", async (req, res) => {
	const { id } = req.params;
	try {
		const result = await db.getEmployeeLocations(id);
		res.status(200).send(result);
	} catch (error) {
		console.log(error);
	}
});

//delete individual employees location
router.delete("/:id/locations/:locationID", async (req, res) => {
	const { id } = req.params;
	const { locationID } = req.params;
	try {
		const employeeLocationId = await db.deleteEmployeeLocation(id, locationID);
		res.status(200).json({ message: `Deleted id: ${employeeLocationId}` });
	} catch (error) {
		console.log(error);
	}
});
// Export the router
module.exports = router;
