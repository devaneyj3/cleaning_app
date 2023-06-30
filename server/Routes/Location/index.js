const express = require("express");
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
	res.status(200).json({ message: "Getting Locations" });
});

router.post("/add", (req, res) => {
	res.status(201).json({ message: "Adding Location" });
});

router.put("/:id/edit", (req, res) => {
	res.status(200).json({ message: "Editing Location" });
});

router.delete("/:id/delete", (req, res) => {
	res.status(200).json({ message: "Deleting Location" });
});

// Export the router
module.exports = router;
