// Import required modules
const express = require("express");

// Create an instance of the Express application
const app = express();

app.use(express.json());

// Require route files
const employeesRoutes = require("./Routes/Employees");
const locationRoutes = require("./Routes/Location");
const productRoutes = require("./Routes/Products");

// Use the routes
app.use("/api/employees", employeesRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/products", productRoutes);

// Define a route
app.get("/", (req, res) => {
	res.send("Hello, world!");
});

if (!module.parent) {
	// Start the server
	app.listen(3000, () => {
		console.log("Server is running on port 3000");
	});
}

module.exports = app;
