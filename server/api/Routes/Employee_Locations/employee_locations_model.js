const db = require("../../../data/db_config");

module.exports = {
	getEmployeeLocations,
	addLocationToEmployee,
	deleteEmployeeLocation,
};

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
