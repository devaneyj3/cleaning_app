/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("location").del();
	await knex("location").insert([
		{
			id: 1,
			name: "Location 1",
			address: "123 Main St",
			phone: "555-123-4567",
			employees_needed: 1,
			city: "City 1",
			state: "State 1",
			zip: 12345,
		},
		{
			id: 2,
			name: "Location 2",
			address: "456 Elm St",
			phone: "555-987-6543",
			employees_needed: 2,
			city: "City 2",
			state: "State 2",
			zip: 54321,
		},
		{
			id: 3,
			name: "Location 3",
			address: "789 Oak St",
			phone: "555-333-2222",
			city: "City 3",
			employees_needed: 1,
			state: "State 3",
			zip: 98765,
		},
		{
			id: 4,
			name: "Location 4",
			address: "101 Pine St",
			phone: "555-888-1111",
			employees_needed: 4,
			city: "City 4",
			state: "State 4",
			zip: 11111,
		},
	]);
};
