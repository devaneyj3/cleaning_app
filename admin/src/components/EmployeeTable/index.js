"use client";

import React, { useEffect, useContext, useState } from "react";

import DataTable from "@/components/table";
import CustomButton from "@/components/CustomButton/CustomButton";

import CustomModal from "@/components/Modal/Modal";
import { EmployeeContext } from "../../app/context/EmployeeContext";
import { LocationContext } from "../../app/context/LocationContext";

import customAxios from "@/utils/CustomAxios";

export default function EmployeeTable() {
	const [modal, setModal] = useState(false);
	const [msg, setMsg] = useState("");
	const {
		employees,
		getEmployees,
		setEmployees,
		employeeLoading,
		editEmployee,
		deleteEmployee,
	} = useContext(EmployeeContext);

	const { locations } = useContext(LocationContext);
	useEffect(() => {
		getEmployees();
	}, []);
	const toggle = () => setModal(!modal);

	if (employeeLoading) {
		return <div>Loading Employees...</div>; // Display a loading message while waiting for data
	}

	const employeeFields = [
		{ name: "Name", label: "Name", type: "text", required: true },
		{ name: "Email", label: "Email", type: "text", required: true },
		{ name: "Phone", label: "Phone", type: "text", required: true },
		{ name: "Username", label: "Username", type: "text", required: true },
		{ name: "Password", label: "Password", type: "text", required: true },
		{ name: "Pay", label: "Pay", type: "number", required: true },
		{ name: "Position", label: "Position", type: "text", required: true },
		{
			name: "Hired",
			label: "Hired",
			type: "date",
			required: true,
		},
	];
	// Add checkboxes for locations dynamically
	const checkboxArr = Object.values(locations).map((locationName) => ({
		...locationName,
		name: `${locationName.Name}`,
		label: `${locationName.Name} - ${locationName.City}`,
		type: "checkbox",
		required: false,
	}));
	let employeeLabelArr;
	if (employees.length > 0) {
		employeeLabelArr = Object.keys(employees[0]);
		employeeLabelArr[0] = "id";
	}

	const SaveEmployee = async (formData, checkedLocations) => {
		console.log("form data is, ", formData);
		console.log("checked locations are, ", checkedLocations);
		try {
			const response = await customAxios().post("/employees", formData);
			// Assuming the response contains the success message from the server.
			console.log("saving and the response is,", response);
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
				<DataTable
					data={employees}
					labels={employeeLabelArr}
					onEdit={editEmployee}
					onDelete={deleteEmployee}
					api="employees"
				/>
			) : (
				<p>Create your first employee to get started</p>
			)}
			<CustomButton text="Create Employee" onClick={toggle} />
			<CustomModal
				isOpen={modal}
				toggle={toggle}
				title="Create Employee"
				msg={msg}
				checkboxArr={checkboxArr}
				fields={employeeFields}
				onSave={SaveEmployee}
			/>
		</main>
	);
}
