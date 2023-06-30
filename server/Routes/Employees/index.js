const express = require("express");
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
	res.status(200).json({ message: "Getting Employees" });
});

router.post("/add", (req, res) => {
	res.status(201).json({ message: "Adding Employees" });
});

router.put("/:id/edit", (req, res) => {
	res.status(200).json({ message: "Editing Employees" });
});

router.delete("/:id/delete", (req, res) => {
	res.status(200).json({ message: "Deleting Employees" });
});

// Export the router
module.exports = router;
