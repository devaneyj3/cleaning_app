"use client";

import React, { useEffect, useContext } from "react";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/Modal/Modal";
import { EmployeeContext } from "../../app/context/EmployeeContext";
import EmployeeTable from "./Table/EmployeeTable";

export default function Employee() {
	const { employees, getEmployees, SaveEmployee, employeeLoading, toggle } =
		useContext(EmployeeContext);

	useEffect(() => {
		getEmployees();
	}, []);

	if (employeeLoading) {
		return <div>Loading Employees...</div>; // Display a loading message while waiting for data
	}

	return (
		<main>
			<p>You have {employees.length} employees</p>
			{employees.length > 0 ? (
				<EmployeeTable employees={employees} />
			) : (
				<p>Create your first employee to get started</p>
			)}
			<CustomButton text="Create Employee" onClick={toggle} />
			{/* <CustomModal
				isOpen={modal}
				toggle={toggle}
				title="Create Employee"
				msg={msg}
				checkboxArr={checkboxArr}
				fields={employeeFields}
				onSave={SaveEmployee}
				modalType="employee"
			/> */}
		</main>
	);
}
