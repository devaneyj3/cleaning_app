/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("employee").del();
	await knex("employee").insert([
		{
			id: 1,
			name: "John Doe",
			email: "johndoe@example.com",
			phone: "123-456-7890",
			username: "johndoe123",
			password: "password123",
			pay: 55000.0,
			position: "Manager",
			hired: new Date("2022-01-15T10:00:00Z"),
		},
		{
			id: 2,
			name: "Jane Smith",
			email: "janesmith@example.com",
			phone: "987-654-3210",
			username: "janesmith789",
			password: "pass789word",
			pay: 48000.0,
			position: "Developer",
			hired: new Date("2022-03-20T09:30:00Z"),
		},
		{
			id: 3,
			name: "Alice Johnson",
			email: "alicejohnson@example.com",
			phone: "555-555-5555",
			username: "alicej",
			password: "secure123",
			pay: 62000.0,
			position: "Designer",
			hired: new Date("2022-04-10T15:45:00Z"),
		},
		{
			id: 4,
			name: "Bob Brown",
			email: "bobbrown@example.com",
			phone: "111-222-3333",
			username: "bobbrown",
			password: "bobspass",
			pay: 42000.0,
			position: "Support",
			hired: new Date("2022-02-05T11:15:00Z"),
		},
	]);
};
