"use client";

import React, { useEffect, useContext, useState } from "react";

import DataTable from "@/components/table";
import CustomButton from "@/components/CustomButton/CustomButton";

import CustomModal from "@/components/Modal/Modal";
import { EmployeeContext } from "../../app/context/EmployeeContext";

import customAxios from "@/utils/CustomAxios";

export default function EmployeeTable() {
	const [modal, setModal] = useState(false);
	const [msg, setMsg] = useState("");
	const { employees, getEmployees, setEmployees, employeeLoading } =
		useContext(EmployeeContext);

	useEffect(() => {
		getEmployees();
	}, []);
	const toggle = () => setModal(!modal);

	if (employeeLoading) {
		return <div>Loading...</div>; // Display a loading message while waiting for data
	}

	const employeeFields = [
		{ name: "name", label: "Name", type: "text", required: true },
		{ name: "email", label: "Email", type: "text", required: true },
		{ name: "phone", label: "Phone", type: "text", required: true },
		{ name: "username", label: "Username", type: "text", required: true },
		{ name: "password", label: "Password", type: "text", required: true },
		{ name: "hourly_pay", label: "Hourly Pay", type: "number", required: true },
		{ name: "position", label: "Position", type: "text", required: true },
		{
			name: "dateHired",
			label: "Date Hired",
			type: "date",
			required: true,
		},
	];

	const SaveEmployee = async (formData) => {
		try {
			const response = await customAxios().post("/employees", formData);
			// Assuming the response contains the success message from the server.
			setEmployees(response.data.employees);
			setMsg("Successfully added employee");
			setTimeout(() => {
				toggle();
				setMsg("");
			}, 1000);
		} catch (error) {
			console.error("Error posting data:", error);
		}
	};

	return (
		<main>
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
				msg={msg}
				fields={employeeFields}
				onSave={SaveEmployee}
			/>
		</main>
	);
}
