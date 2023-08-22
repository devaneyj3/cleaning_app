const request = require("supertest");
const app = require("../index");

let server;

beforeAll((done) => {
	server = app.listen(3002, done); // Start the server and save the server object
});

afterAll((done) => {
	server.close(done); // Close the server
});

describe("Locations API", () => {
	let createdLocation;

	beforeEach(async () => {
		const response = await request(app).post("/api/locations").send({
			id: 1,
			name: "PNC",
			address: "1041 Main Street",
			city: "Johnson",
			state: "MI",
			zip: 43330,
		});

		createdLocation = response.body;
	});
	it("should retrieve all locations", async () => {
		const res = await request(app).get("/api/locations");
		expect(res.statusCode).toEqual(200);
	});

	it("should create a new location", async () => {
		const newLocation = {
			name: "Huntington",
			address: "1041 Main Street",
			city: "Miracle",
			state: "MI",
			zip: 42230,
		};
		const res = await request(app).post("/api/locations").send(newLocation);
		expect(res.statusCode).toEqual(201);
		expect(res.body.location).toEqual(newLocation);
	});

	it("should update an existing location", async () => {
		const updatedLocation = {
			id: 1,
			name: "TCF",
			address: "1041 Main Street",
			city: "Johnson",
			state: "MI",
			zip: 43330,
		};
		const res = await request(app)
			.put(`/api/locations/${updatedLocation.id}/edit`)
			.send(updatedLocation);
		expect(res.statusCode).toEqual(200),
			expect(res.body.location).toEqual(updatedLocation);
	});

	it("should delete an location", async () => {
		const res = await request(app).delete(
			`/api/locations/${createdLocation.id}/delete`
		);
		expect(res.statusCode).toEqual(200);
	});
});
