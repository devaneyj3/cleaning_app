const db = require("../../../data/db_config");

module.exports = {
	insertProductToLocation,
	getProductLocation,
	deleteProductLocation,
};

function getProductLocation(productID) {
	return db("product as p")
		.join("product_locations as pl", "pl.product_id", "p.id")
		.join("location as l", "pl.location_id", "l.id")
		.select("p.*")
		.where("pl.product_id", productID);
}

function insertProductToLocation(productID, locationID) {
	return db("product_locations").insert({
		product_id: productID,
		location_id: locationID,
	});
}
function deleteProductLocation(productID, locationID) {
	return db("product_locations")
		.where({
			product_id: productID,
			location_id: locationID,
		})
		.del();
}
