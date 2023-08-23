const request = require("supertest");
const app = require("../index");
const db = require("../api/db_model");

let server;
let createdProductId;

beforeAll((done) => {
	server = app.listen(3004, done); // Start the server and save the server object
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

//DATABASE TESTS
describe("Database Operations", () => {
	let createdProductId;

	beforeEach(async () => {
		const response = await request(app).post("/api/products").send({
			Name: "503",
			Quantity: "1 LT",
			Use: "Floors",
			Status: "Out",
			Type: "Floor Cleaner",
		});

		createdProductId = response.body.newProduct.id;
	});

	afterEach(async () => {
		const products = await db.getFromDB("product");
		for (const product of products) {
			await db.deleteByID("product", product.id);
		}
	});

	it("should get all products from the database", async () => {
		const product = await db.getFromDB("product");
		expect(product).toBeDefined();
		// Add more assertions as needed
	});

	it("should create a new product in the database", async () => {
		const newProductData = {
			Name: "New Product",
			Quantity: "2 LT",
			Use: "Test Use",
			Status: "In",
			Type: "Test Type",
		};

		const createdProduct = await db.addData("product", newProductData);
		expect(createdProduct).toBeDefined();
		expect(createdProduct.Name).toEqual(newProductData.Name);
		expect(createdProduct.Quantity).toEqual(newProductData.Quantity);
		expect(createdProduct.Use).toEqual(newProductData.Use);
		expect(createdProduct.Status).toEqual(newProductData.Status);
		expect(createdProduct.Type).toEqual(newProductData.Type);

		const productFromDB = await db.findByID("product", createdProduct.id);
		expect(productFromDB).toEqual(createdProduct);
	});

	it("should retrieve an product from the database", async () => {
		const product = await db.findByID("product", createdProductId);
		expect(product).toBeDefined();
		// Add more assertions as needed
	});

	it("should update a product in the database", async () => {
		const updatedProductData = {
			Name: "Updated John Doe",
			// ... other updated fields ...
		};
		await db.edit("product", createdProductId, updatedProductData);
		const updatedProduct = await db.findByID("product", createdProductId);
		expect(updatedProduct.Name).toEqual("Updated John Doe");
		// Add more assertions as needed
	});

	it("should delete a product from the database", async () => {
		await db.deleteByID("product", createdProductId);
		const deletedProduct = await db.findByID("product", createdProductId);
		expect(deletedProduct).toBeUndefined();
	});

	// Add more tests for other database operations
});
