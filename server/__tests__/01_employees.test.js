const request = require("supertest");
const app = require("../index");

let server;
let createdEmployeeId;

const date = "2022-04-03T04:00:00.000Z";

beforeAll((done) => {
	server = app.listen(3002, done);
});

afterAll(async () => {
	await request(app).delete(`/api/employees/${createdEmployeeId}/delete`);
	server.close();
});

describe("Employees API", () => {
	let createdEmployee;

	beforeAll(async () => {
		const response = await request(app).post("/api/employees").send({
			Name: "John Doe1",
			Email: "john@gmail.com",
			Phone: "777-777-7777",
			Username: "john3",
			Password: "hello",
			Pay: 15.0,
			Position: "cleaner",
			Hired: date,
		});

		createdEmployee = response.body;
		createdEmployeeId = createdEmployee.newEmployee.id;
	});

	it("should retrieve all employees", async () => {
		const res = await request(app).get("/api/employees");
		expect(res.statusCode).toEqual(200);
		expect(res.body.employee).toEqual(createdEmployee.employees);
	});

	it("should retrieve a specific employee", async () => {
		const res = await request(app).get(`/api/employees/${createdEmployeeId}`);
		expect(res.statusCode).toEqual(200);

		expect(res.body.employee).toEqual(createdEmployee.newEmployee);
	});

	it("should create a new employee", async () => {
		const newEmployee = {
			Name: "John Doe",
			Email: "john@gmail.com",
			Phone: "777-777-7777",
			Username: "john3",
			Password: "hello",
			Pay: 15.0,
			Position: "cleaner",
			Hired: date,
		};
		const res = await request(app).post("/api/employees/").send(newEmployee);
		newEmployee.id = res.body.newEmployee.id;
		expect(res.statusCode).toEqual(201);
		expect(res.body.newEmployee).toEqual(newEmployee);
	});

	it("should update an existing employee", async () => {
		const updatedEmployee = {
			Name: "John Smoe",
			Email: "john@gmail.com",
			Phone: "777-777-7777",
			Username: "john4",
			Password: "hello",
			Pay: 19.0,
			Position: "cleaner",
			Hired: date,
		};
		const res = await request(app)
			.put(`/api/employees/${createdEmployeeId}/edit`)
			.send(updatedEmployee);

		expect(res.statusCode).toEqual(200);
		expect(res.body.employees).toContainEqual(res.body.updatedEmployee);
	});

	it("should delete an employee", async () => {
		const res = await request(app).delete(
			`/api/employees/${createdEmployeeId}/delete`
		);
		expect(res.statusCode).toEqual(200);
	});
});
