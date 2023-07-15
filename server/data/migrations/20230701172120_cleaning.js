exports.up = function (knex) {
	return knex.schema
		.createTable("employee", (tbl) => {
			tbl.increments();
			tbl.text("name").notNullable();
			tbl.text("email").notNullable();
			tbl.text("phone").notNullable();
			tbl.text("username").notNullable();
			tbl.text("password").notNullable();
			tbl.float("hourly_pay").notNullable();
			tbl.text("position").notNullable();
		})
		.createTable("location", (tbl) => {
			tbl.increments();
			tbl.text("name").notNullable();
			tbl.text("address").notNullable();
			tbl.text("phone").notNullable();
			tbl.text("username").notNullable();
			tbl.text("password").notNullable();
		})
		.createTable("product", (tbl) => {
			tbl.increments();
			tbl.text("name").notNullable();
			tbl.integer("quantity");
			tbl.text("use").notNullable();
			tbl.text("status");
			tbl.text("type");
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
