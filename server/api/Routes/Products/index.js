const express = require("express");
const db = require("../../db_model");
const router = express.Router();

// Define routes
router.get("/", async (req, res) => {
	try {
		const data = await db.getFromDB("product");
		res.status(200).json({ product: data, message: "Getting Products" });
	} catch (error) {
		console.log(error);
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const data = await db.findByID("product", id);
		res.status(200).json({ product: data });
	} catch (error) {
		console.log(error);
	}
});

router.post("/", async (req, res) => {
	try {
		const newProduct = await db.addData("product", req.body);
		const products = await db.getFromDB("product");
		res.status(201).json({
			newProduct: newProduct,
			products: products,
			message: `Creating product ${req.body.name}`,
		});
	} catch (error) {
		console.log(error);
	}
});

router.put("/:id/edit", async (req, res) => {
	const { id } = req.params;
	try {
		const updatedProduct = await db.edit("product", id, req.body);
		const data = await db.getFromDB("product");
		res.status(200).json({
			updatedProduct: updatedProduct,
			products: data,
			message: "Editing Products",
		});
	} catch (error) {
		console.log(error);
	}
});

router.delete("/:id/delete", async (req, res) => {
	const { id } = req.params;
	try {
		await db.deleteByID("product", id);
		res.status(200).json({ id: id, message: "Deleting Product" });
	} catch (error) {
		console.log(error);
	}
});

// Export the router
module.exports = router;
