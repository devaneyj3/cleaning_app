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
		{ name: "name", label: "Name", type: "text", required: true },
		{ name: "email", label: "Email", type: "text", required: true },
		{ name: "phone", label: "Phone", type: "text", required: true },
		{ name: "username", label: "Username", type: "text", required: true },
		{ name: "password", label: "Password", type: "text", required: true },
		{ name: "pay", label: "Pay", type: "number", required: true },
		{ name: "position", label: "Position", type: "text", required: true },
		{
			name: "hired",
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
		employeeLabelArr = employeeLabelArr = employeeFields.reduce(
			(acc, field) => {
				acc.push(field.label);
				return acc;
			},
			[]
		);

		employeeLabelArr[0] = "Id";
		console.log(employeeLabelArr);
	}

	const SaveEmployee = async (formData, checkedLocations) => {
		try {
			const response = await customAxios().post("/employees", formData);
			// Assuming the response contains the success message from the server.
			const employeeId = response.data.newEmployee.id;
			for (const locationId of checkedLocations) {
				await SaveLocationToEmployee(employeeId, locationId);
			}

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
	const SaveLocationToEmployee = async (employeeId, location_id) => {
		try {
			await customAxios().post(
				`/employee-locations/${employeeId}/locations/${location_id}`
			);
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
