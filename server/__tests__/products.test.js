const request = require("supertest");
const app = require("../index");

let server;

beforeAll((done) => {
	server = app.listen(3002, done); // Start the server and save the server object
});

afterAll((done) => {
	server.close(done); // Close the server
});

describe("Products API", () => {
	let createdProduct;

	beforeEach(async () => {
		const response = await request(app).post("/api/products").send({
			id: 1,
			name: "503",
			quatity: "1 LT",
			use: "Floors",
			status: "Out",
			type: "Floor Cleaner",
		});

		createdProduct = response.body;
	});
	it("should retrieve all products", async () => {
		const res = await request(app).get("/api/products");
		expect(res.statusCode).toEqual(200);
	});

	it("should create a new product", async () => {
		const newLocation = {
			name: "530",
			quatity: "2 LT",
			use: "Counters",
			status: "In",
			type: "All Surface",
		};
		const res = await request(app).post("/api/products").send(newLocation);
		expect(res.statusCode).toEqual(201);
		expect(res.body.product).toEqual(newLocation);
	});

	it("should update an existing product", async () => {
		const updatedProduct = {
			id: 1,
			name: "503",
			quatity: "1 LT",
			use: "Floors",
			status: "IN",
			type: "Floor Cleaner",
		};
		const res = await request(app)
			.put(`/api/products/${updatedProduct.id}/edit`)
			.send(updatedProduct);
		expect(res.statusCode).toEqual(200),
			expect(res.body.product).toEqual(updatedProduct);
	});

	it("should delete an product", async () => {
		const res = await request(app).delete(
			`/api/locations/${createdProduct.id}/delete`
		);
		expect(res.statusCode).toEqual(200);
	});
});
