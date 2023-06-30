const express = require("express");
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
	res.status(200).json({ message: "Getting Products" });
});

router.post("/add", (req, res) => {
	res.status(201).json({ message: "Adding Product" });
});

router.put("/:id/edit", (req, res) => {
	res.status(200).json({ message: "Editing Product" });
});

router.delete("/:id/delete", (req, res) => {
	res.status(200).json({ message: "Deleting Product" });
});

// Export the router
module.exports = router;
