const express = require("express");
const db = require("./product_locations_model");
const router = express.Router();

//PRODUCTS ARE ASSISNED A LOCATION
router.post("/:productID/locations/:locationID", async (req, res) => {
	const { productID } = req.params;
	const { locationID } = req.params;
	try {
		await db.insertProductToLocation(productID, locationID);
		res
			.status(201)
			.json({ message: `Product ID: ${productID} successfully added` });
	} catch (error) {
		console.log(error);
	}
});

//get product locations
router.get("/:productID/locations", async (req, res) => {
	const { productID } = req.params;
	try {
		const result = await db.getProductLocation(productID);
		res.status(200).send(result);
	} catch (error) {
		console.log(error);
	}
});

//delete individual product location
router.delete("/:productID/locations/:locationID", async (req, res) => {
	const { productID } = req.params;
	const { locationID } = req.params;
	try {
		const productLocationId = await db.deleteProductLocation(
			productID,
			locationID
		);
		res.status(200).json({ message: `Deleted id: ${productLocationId}` });
	} catch (error) {
		console.log(error);
	}
});
// Export the router
module.exports = router;
