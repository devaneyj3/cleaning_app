const db = require("../data/db_config");

module.exports = {
	getFromDB,
	addData,
	clearDatabase,
	find,
	findByID,
	deleteByID,
	edit,
	getEmployeeLocations,
	addLocationToEmployee,
	deleteEmployeeLocation,
};

//reusable get function to retreive data from all databases
function getFromDB(dbName) {
	return db(dbName);
}

//POST data to the database
async function addData(text, object) {
	const [newId] = await db(text).insert(object).returning("id");
	object.id = newId.id;
	const newObject = { ...object };
	return newObject;
}

function find(name, object) {
	return db(name).where({ username: object }).first();
}
function findByID(name, id) {
	return db(name).where({ id: id }).first();
}
function deleteByID(name, id) {
	return db(name).where({ id: id }).del();
}

async function edit(name, id, data) {
	try {
		const updatedData = { ...data };
		// Validate if req.body is not empty and contains at least one field to update
		if (Object.keys(updatedData).length === 0) {
			throw new Error("No data provided for the update.");
		}

		// Use the Knex instance to update the data
		const numRowsUpdated = await db(name).where({ id: id }).update(updatedData);

		// Check if any rows were updated
		if (numRowsUpdated === 0) {
			throw new Error("No matching record found for the provided id.");
		}

		// Fetch and return the updated data
		const updatedRecord = await findByID(name, id);
		return updatedRecord;
	} catch (error) {
		// Handle any errors that might occur during the update
		console.error("Error updating data:", error);
		throw error;
	}
}

function getEmployeeLocations(id) {
	return db("employee as e")
		.join("employee_locations as el", "el.employee_id", "e.id")
		.join("location as l", "el.location_id", "l.id")
		.select("l.*")
		.where("el.employee_id", id);
}

function addLocationToEmployee(id, locationID) {
	return db("employee_locations").insert({
		employee_id: id,
		location_id: locationID,
	});
}
function deleteEmployeeLocation(id, locationID) {
	return db("employee_locations")
		.where({
			employee_id: id,
			location_id: locationID,
		})
		.del();
}

function clearDatabase(text) {
	return db(text).truncate();
}
