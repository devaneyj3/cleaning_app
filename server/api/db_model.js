const db = require("../data/db_config");

module.exports = {
	getFromDB,
	addData,
	clearDatabase,
	find,
	findByID,
	deleteByID,
	edit,
	getIdClasses,
	instructorPostClasses,
	editClasses,
	addClassToClient,
	incrementClassAttendees,
};

//reusable get function to retreive data from all databases
function getFromDB(dbName) {
	return db(dbName);
}

//POST data to the database
function addData(text, object) {
	return db(text).insert(object);
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
function edit(name, id, username, password) {
	const data = db(name)
		.where({ id: id })
		.update({ username: username, password: password });
	return data;
}

function getIdClasses(text, id) {
	if (text === "instructors") {
		return db("instructors as i")
			.join("classes as c", "i.id", `c.instructor_id`)
			.select(
				"c.id",
				"c.name",
				"c.type",
				"c.startTime",
				"c.duration",
				"c.intensityLevel",
				"c.location",
				"c.attendees",
				"c.maxClassSize"
			)
			.where("c.instructor_id", id);
	} else {
		return db("clients as c")
			.join("clients_classes as cc", "cc.client_id", "c.id")
			.join("classes as cl", "cc.class_id", "cl.id")
			.select(
				"cl.id",
				"cl.name",
				"cl.type",
				"cl.instructor_name",
				"cl.startTime",
				"cl.duration",
				"cl.intensityLevel",
				"cl.location",
				"cl.attendees",
				"cl.maxClassSize"
			)
			.where("cc.client_id", id);
	}
}

//instructor can post classes that they teach
function instructorPostClasses(object, id) {
	console.log("instructorPostClasses, ", object);
	return db("classes").insert(object).where({ id: id });
}

function editClasses(
	id,
	name,
	type,
	startTime,
	duration,
	intensityLevel,
	location,
	attendees,
	maxClassSize
) {
	const data = db("classes").where({ id: id }).update({
		name,
		type,
		startTime,
		duration,
		intensityLevel,
		location,
		attendees,
		maxClassSize,
	});
	return data;
}

function addClassToClient(id, clasID) {
	return db("clients_classes").insert({ client_id: id, class_id: clasID });
}

function incrementClassAttendees(id) {
	return db("classes").where({ id: id }).increment("attendees", 1);
}

function clearDatabase(text) {
	return db(text).truncate();
}
