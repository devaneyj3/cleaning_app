const express = require("express");
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
	res.status(200).json({ location: req.body, message: "Getting Locations" });
});

router.post("/", (req, res) => {
	res.status(201).json({ location: req.body, message: "Adding Location" });
});

router.put("/:id/edit", (req, res) => {
	res.status(200).json({ location: req.body, message: "Editing Location" });
});

router.delete("/:id/delete", (req, res) => {
	res.status(200).json({ location: req.body, message: "Deleting Location" });
});

// Export the router
module.exports = router;
