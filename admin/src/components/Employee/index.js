"use client";
import { Modal } from "reactstrap";
import React, { useEffect, useContext } from "react";
import CustomButton from "@/components/CustomButton/CustomButton";
import { EmployeeContext } from "../../app/context/EmployeeContext";
import EmployeeTable from "./Table/EmployeeTable";
import CreateEmployee from "./CreateEmployee";

export default function Employee() {
	const { employees, getEmployees, employeeLoading, toggle, modal } =
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
				<EmployeeTable />
			) : (
				<p>Create your first employee to get started</p>
			)}

			<CustomButton text="Create Employee" onClick={toggle} />
			<Modal isOpen={modal} toggle={toggle}>
				<CreateEmployee />
			</Modal>
		</main>
	);
}
