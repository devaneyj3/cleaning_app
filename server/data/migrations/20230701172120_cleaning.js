exports.up = function (knex) {
	return knex.schema
		.createTable("employee", (tbl) => {
			tbl.increments();
			tbl.text("Name").notNullable();
			tbl.text("Email").notNullable();
			tbl.text("Phone").notNullable();
			tbl.text("Username").notNullable();
			tbl.text("Password").notNullable();
			tbl.float("Pay").notNullable();
			tbl.text("Position").notNullable();
			tbl.timestamp("Hired").notNullable();
		})
		.createTable("location", (tbl) => {
			tbl.increments();
			tbl.text("Name").notNullable();
			tbl.text("Address").notNullable();
			tbl.text("Phone").notNullable();
			tbl.text("City").notNullable();
			tbl.text("State").notNullable();
			tbl.integer("Zip").notNullable();
		})
		.createTable("product", (tbl) => {
			tbl.increments();
			tbl.text("name").notNullable();
			tbl.text("quantity").notNullable();
			tbl.text("use").notNullable();
			tbl.text("status").notNullable();
			tbl.text("type").notNullable();
		})
		.createTable("employee_locations", (tbl) => {
			tbl
				.integer("employee_id")
				.notNullable()
				.unsigned()
				.references("id")
				.inTable("employee")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			tbl
				.integer("location_id")
				.notNullable()
				.unsigned()
				.references("id")
				.inTable("location")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			tbl.primary(["employee_id", "location_id"]);
		})
		.createTable("product_locations", (tbl) => {
			tbl
				.integer("product_id")
				.notNullable()
				.unsigned()
				.references("id")
				.inTable("product")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			tbl
				.integer("location_id")
				.notNullable()
				.unsigned()
				.references("id")
				.inTable("location")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			tbl.primary(["product_id", "location_id"]);
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("product_locations")
		.dropTableIfExists("employee_locations")
		.dropTableIfExists("product")
		.dropTableIfExists("location")
		.dropTableIfExists("employee");
};
