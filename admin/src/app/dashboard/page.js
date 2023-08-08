"use client";

import React, { useEffect, useContext, useState } from "react";

import DataTable from "@/components/table";

import "./dashboard.css";
import CustomButton from "@/components/CustomButton/CustomButton";

import CustomModal from "@/components/Modal/Modal";
import { EmployeeContext } from "../context/EmployeeContext";
import { LocationContext } from "../context/LocationContext";

export default function Dashboard() {
	const [modal, setModal] = useState(false);

	const { employees, getEmployees, employeeLoading } =
		useContext(EmployeeContext);
	const { location, getLocations, loading } = useContext(LocationContext);

	useEffect(() => {
		getEmployees();
	}, []);
	useEffect(() => {
		getLocations();
	}, []);

	const toggle = () => setModal(!modal);

	if (employeeLoading) {
		return <div>Loading...</div>; // Display a loading message while waiting for data
	}

	return (
		<main>
			<h1>Welcome to your dashboard</h1>
			<p>You can create your employees, locations, and products</p>
			<p>Click on an employee, location, and products for more information</p>
			<p>You have {employees.length} employees</p>
			{employees.length > 0 ? (
				<DataTable data={employees} />
			) : (
				<p>Create your first employee to get started</p>
			)}
			<CustomButton text="Create Employee" onClick={toggle} />
			<CustomModal
				isOpen={modal}
				toggle={toggle}
				title="Create Employee"
				msg="Successfully created employee"
			/>
			{location.length > 0 ? (
				<DataTable data={location} />
			) : (
				<p>Create your first employee to get started</p>
			)}
			<CustomButton text="Create Location" onClick={toggle} />
			<CustomModal
				isOpen={modal}
				toggle={toggle}
				title="Create Location"
				msg="Successfully created location"
			/>
		</main>
	);
}
