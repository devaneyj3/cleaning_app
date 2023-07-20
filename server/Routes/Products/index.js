const express = require("express");
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
	res.status(200).json({ product: req.body, message: "Getting Products" });
});

router.post("/", (req, res) => {
	res.status(201).json({ product: req.body, message: "Adding Product" });
});

router.put("/:id/edit", (req, res) => {
	res.status(200).json({ product: req.body, message: "Editing Product" });
});

router.delete("/:id/delete", (req, res) => {
	res.status(200).json({ product: req.body, message: "Deleting Product" });
});

// Export the router
module.exports = router;
