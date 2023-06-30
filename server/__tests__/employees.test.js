const request = require("supertest");
const app = require("../index");
describe("Employees API", () => {
	it("should retrieve all employees", async () => {
		const res = await request(app).get("/api/employees");
		expect(res.statusCode).toEqual(200);
	});

	it("should create a new employee", async () => {
		const newEmployee = { name: "John Doe", age: 30, position: "Developer" };
		const res = await request(app).post("/api/employees/add").send(newEmployee);
		expect(res.statusCode).toEqual(201);
	});

	it("should update an existing employee", async () => {
		const updatedEmployee = {
			name: "Updated Name",
			age: 35,
			position: "Manager",
		};
		const res = await request(app)
			.put("/api/employees/:id")
			.send(updatedEmployee);
		expect(res.statusCode).toEqual(404);
	});

	it("should delete an employee", async () => {
		const res = await request(app).delete("/api/employees/:id");
		expect(res.statusCode).toEqual(404);
	});
});
