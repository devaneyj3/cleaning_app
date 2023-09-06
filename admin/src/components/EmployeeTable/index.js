"use client";

import React, { useEffect, useContext } from "react";

import DataTable from "@/components/table";
import CustomButton from "@/components/CustomButton/CustomButton";

import CustomModal from "@/components/Modal/Modal";
import { EmployeeContext } from "../../app/context/EmployeeContext";
import { LocationContext } from "../../app/context/LocationContext";

import moment from "moment";

export default function EmployeeTable() {
	const {
		employees,
		getEmployees,
		SaveEmployee,
		employeeLoading,
		editEmployee,
		deleteEmployee,
		modal,
		msg,
		toggle,
	} = useContext(EmployeeContext);

	const { locations } = useContext(LocationContext);
	useEffect(() => {
		getEmployees();
	}, []);

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
		name: `${locationName.name}`,
		label: `${locationName.name} - ${locationName.city}`,
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
	}

	const updatedEmployees = employees.map((employee) => ({
		...employee,
		hired: moment(employee.hired).format("MM/DD/YYYY"),
	}));

	return (
		<main>
			<p>You have {employees.length} employees</p>
			{employees.length > 0 ? (
				<DataTable
					rows={updatedEmployees}
					headers={employeeLabelArr}
					api="employees"
					deleteEntry={deleteEmployee}
					editEntry={editEmployee}
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
				modalType="employee"
			/>
		</main>
	);
}
