/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("product").del();
	await knex("product").insert([
		{
			id: 1,
			name: "Product 1",
			quantity: "10",
			use: "Use 1",
			status: "Active",
			type: "Type 1",
		},
		{
			id: 2,
			name: "Product 2",
			quantity: "20",
			use: "Use 2",
			status: "Inactive",
			type: "Type 2",
		},
		{
			id: 3,
			name: "Product 3",
			quantity: "5",
			use: "Use 3",
			status: "Active",
			type: "Type 1",
		},
		{
			id: 4,
			name: "Product 4",
			quantity: "15",
			use: "Use 4",
			status: "Active",
			type: "Type 2",
		},
	]);
};
