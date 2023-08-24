// Import required modules
const express = require("express");
const cors = require("cors");

// Create an instance of the Express application
const app = express();

app.use(express.json());
// Allow all requests from http://localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));

// Require route files
const employeesRoutes = require("./api/Routes/Employees");
const locationRoutes = require("./api/Routes/Location");
const productRoutes = require("./api/Routes/Products");
const productLocationRoute = require("./api/Routes/Product_Locations");
const employeeLocationRoute = require("./api/Routes/Employee_Locations");

// Use the routes
app.use("/api/employees", employeesRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-locations", productLocationRoute);
app.use("/api/employee-locations", employeeLocationRoute);

// Define a route
app.get("/", (req, res) => {
	res.send("Hello, world!");
});

if (!module.parent) {
	// Start the server
	app.listen(3001, () => {
		console.log("Server is running on port 3001");
	});
}

module.exports = app;
