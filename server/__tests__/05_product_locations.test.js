const request = require("supertest");
const app = require("../index");
const db = require("../api/Routes/Product_Locations/product_locations_model");

let server;

beforeAll((done) => {
	server = app.listen(3006, done); // Start the server and save the server object
});

afterAll((done) => {
	server.close(done); // Close the server
});

describe("Product_Locations API", () => {
	beforeEach(async () => {
		const product_id = 1;
		const location_id = 1;

		await db.deleteProductLocation(product_id, location_id);
	});

	it("should create a new product location", async () => {
		const product_id = 1;
		const location_id = 1;

		const res = await request(app)
			.post(`/api/product-locations/${product_id}/locations/${location_id}`)
			.send({});

		expect(res.statusCode).toEqual(201);
	});

	it("should get a product's location", async () => {
		const product_id = 1;
		const location_id = 1;

		await request(app).post(
			`/api/product-locations/${product_id}/locations/${location_id}`
		);

		const res = await request(app).get(
			`/api/product-locations/${product_id}/locations`
		);

		const expectedKeys = ["id", "name", "quantity", "use", "status", "type"];

		expect(Object.keys(res.body[0])).toEqual(expectedKeys);
		expect(res.statusCode).toEqual(200);
		expect(Array.isArray(res.body)).toBe(true);
	});

	it("should delete a product's location", async () => {
		const product_id = 1;
		const location_id = 1;

		const res = await request(app).delete(
			`/api/product-locations/${product_id}/locations/${location_id}`
		);
		expect(res.statusCode).toEqual(200);
	});
});
