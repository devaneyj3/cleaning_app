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
	const {
		employees,
		getEmployees,
		setEmployees,
		employeeLoading,
		editEmployee,
		deleteEmployee,
	} = useContext(EmployeeContext);

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

	const employeeLabelArr = employeeFields.map((field) => field.label);

	employeeLabelArr[0] = "id";

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
				fields={employeeFields}
				onSave={SaveEmployee}
			/>
		</main>
	);
}
