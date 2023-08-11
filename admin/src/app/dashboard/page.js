"use client";

import React from "react";

import "./dashboard.css";

import EmployeeTable from "@/components/EmployeeTable";
import LocationTable from "@/components/LocationTable";

export default function Dashboard() {
	return (
		<main>
			<h1>Welcome to your dashboard</h1>
			<p>You can create your employees, locations, and products</p>
			<p>Click on an employee, location, and products for more information</p>
			<section className="tables">
				<EmployeeTable />
				<LocationTable />
			</section>
		</main>
	);
}
