const request = require("supertest");
const app = require("../index");

let server;

beforeAll((done) => {
	server = app.listen(4000, done); // Start the server and save the server object
});

afterAll((done) => {
	server.close(done); // Close the server
});

describe("Employees API", () => {
	let createdEmployee;

	beforeEach(async () => {
		const response = await request(app).post("/api/employees").send({
			id: 1,
			name: "John Doe1",
			email: "john@gmail.com",
			phone: "777-777-7777",
			username: "john3",
			password: "hello",
			hourly_pay: 15.0,
			position: "cleaner",
		});

		createdEmployee = response.body;
	});
	it("should retrieve all employees", async () => {
		const res = await request(app).get("/api/employees");
		expect(res.statusCode).toEqual(200);
	});

	it("should create a new employee", async () => {
		const newEmployee = {
			name: "John Doe",
			email: "john@gmail.com",
			phone: "777-777-7777",
			username: "john3",
			password: "hello",
			hourly_pay: 15.0,
			position: "cleaner",
		};
		const res = await request(app).post("/api/employees/").send(newEmployee);
		expect(res.statusCode).toEqual(201);
		expect(res.body.employee).toEqual(newEmployee);
	});

	it("should update an existing employee", async () => {
		const updatedEmployee = {
			id: 1,
			name: "John Smoe",
			email: "john@gmail.com",
			phone: "777-777-7777",
			username: "john4",
			password: "hello",
			hourly_pay: 19.0,
			position: "cleaner",
		};
		const res = await request(app)
			.put(`/api/employees/${createdEmployee.id}/edit`)
			.send(updatedEmployee);
		expect(res.statusCode).toEqual(200),
			expect(res.body.employee).toEqual(updatedEmployee);
	});

	it("should delete an employee", async () => {
		const res = await request(app).delete(
			`/api/employees/${createdEmployee.id}/delete`
		);
		expect(res.statusCode).toEqual(200);
	});
});
