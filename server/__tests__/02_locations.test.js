const request = require("supertest");
const app = require("../index");

let server;
let createdLocationId;

beforeAll((done) => {
	server = app.listen(3003, done); // Start the server and save the server object
});

afterAll((done) => {
	server.close(done); // Close the server
});

describe("Locations API", () => {
	let createdLocation;

	beforeAll(async () => {
		const response = await request(app).post("/api/locations").send({
			name: "PNC",
			address: "1041 Main Street",
			phone: "888-888-8888",
			city: "Johnson",
			state: "MI",
			zip: 43330,
		});

		createdLocation = response.body;
		createdLocationId = createdLocation.newLocation.id;
	});
	it("should retrieve all locations", async () => {
		const res = await request(app).get("/api/locations");
		expect(res.statusCode).toEqual(200);
	});

	it("should create a new location", async () => {
		const newLocation = {
			name: "Huntington",
			address: "1041 Main Street",
			phone: "888-888-8888",
			city: "Miracle",
			state: "MI",
			zip: 42230,
		};

		const res = await request(app).post("/api/locations").send(newLocation);
		newLocation.id = res.body.newLocation.id;
		expect(res.statusCode).toEqual(201);
		expect(res.body.newLocation).toEqual(newLocation);
	});

	it("should retrieve a specific location", async () => {
		const res = await request(app).get(`/api/locations/${createdLocationId}`);
		expect(res.statusCode).toEqual(200);

		expect(res.body.location).toEqual(createdLocation.newLocation);
	});

	it("should update an existing location", async () => {
		const updatedLocation = {
			name: "TCF",
			address: "1041 Main Street",
			phone: "888-888-8888",
			city: "Johnson",
			state: "MI",
			zip: 43330,
		};
		const res = await request(app)
			.put(`/api/locations/${createdLocationId}/edit`)
			.send(updatedLocation);
		expect(res.statusCode).toEqual(200);
		expect(res.body.locations).toContainEqual(res.body.updatedLocation);
	});

	it("should delete a location", async () => {
		const res = await request(app).delete(
			`/api/locations/${createdLocationId}/delete`
		);
		expect(res.statusCode).toEqual(200);
	});
});
