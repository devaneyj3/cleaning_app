const request = require("supertest");
const app = require("../index");

let server;
let createdProductId;

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
			Name: "503",
			Quantity: "1 LT",
			Use: "Floors",
			Status: "Out",
			Type: "Floor Cleaner",
		});

		createdProduct = response.body;
		createdProductId = createdProduct.newProduct.id;
	});
	it("should retrieve all products", async () => {
		const res = await request(app).get("/api/products");
		expect(res.statusCode).toEqual(200);
		expect(res.body.products).toEqual(createdProduct.product);
	});

	it("should create a new product", async () => {
		const newProduct = {
			Name: "530",
			Quantity: "2 LT",
			Use: "Counters",
			Status: "In",
			Type: "All Surface",
		};
		const res = await request(app).post("/api/products").send(newProduct);

		newProduct.id = res.body.newProduct.id;
		expect(res.statusCode).toEqual(201);
		expect(res.body.newProduct).toEqual(newProduct);
	});

	it("should retrive a specific product", async () => {
		const res = await request(app).get(`/api/products/${createdProductId}`);
		expect(res.statusCode).toEqual(200);

		expect(res.body.product).toEqual(createdProduct.newProduct);
	});

	it("should update an existing product", async () => {
		const updatedProduct = {
			Name: "503",
			Quantity: "1 LT",
			Use: "Floors",
			Status: "IN",
			Type: "Floor Cleaner",
		};
		const res = await request(app)
			.put(`/api/products/${createdProductId}/edit`)
			.send(updatedProduct);
		expect(res.statusCode).toEqual(200),
			expect(res.body.products).toContainEqual(res.body.updatedProduct);
	});

	it("should delete an product", async () => {
		const res = await request(app).delete(
			`/api/products/${createdProductId}/delete`
		);
		expect(res.statusCode).toEqual(200);
	});
});
