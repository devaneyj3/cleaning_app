const request = require("supertest");
const app = require("../index");
const db = require("../api/Routes/Employee_Locations/employee_locations_model");

let server;

beforeAll((done) => {
	server = app.listen(3005, done); // Start the server and save the server object
});

afterAll((done) => {
	server.close(done); // Close the server
});

describe("Employee_Locations API", () => {
	it("should create a new location", async () => {
		const newEmployeeLocation = {
			employee_id: 3,
			location_id: 1,
		};

		await db.deleteEmployeeLocation(
			newEmployeeLocation.employee_id,
			newEmployeeLocation.location_id
		);

		const res = await request(app)
			.post(`/api/employee-locations/3/locations/1`)
			.send(newEmployeeLocation);

		expect(res.statusCode).toEqual(201);
	});

	it("should retrive a specific employee location", async () => {
		const res = await request(app).get(`/api/employee-locations/3/locations`);
		expect(res.statusCode).toEqual(200);
	});

	it("should delete an employee's location", async () => {
		const res = await request(app).delete(
			"/api/employee-locations/3/locations/1"
		);
		expect(res.statusCode).toEqual(200);
	});
});
