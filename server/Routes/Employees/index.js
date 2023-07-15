const express = require("express");
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
	res.status(200).json({ employee: req.body, message: "Getting Employees" });
});

router.post("/", (req, res) => {
	res.status(201).json({ employee: req.body, message: "Adding Employee" });
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
