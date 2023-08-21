"use client";

import React, { createContext, useState } from "react";

import customAxios from "@/utils/CustomAxios";

const EmployeeContext = createContext();

const EmployeeContextProvider = ({ children }) => {
	const [employees, setEmployees] = useState([]);
	const [employeeLoading, setLoading] = useState(true);
	const [selectedEmployee, setSelectedEmployee] = useState(null);

	const getEmployees = async () => {
		try {
			const response = await customAxios().get("/employees");
			const employees = response.data;
			// Do something with the employees' data here.
			setEmployees(employees.employee);
			setLoading(false);
		} catch (error) {
			// Handle any errors that might occur during the API request.
			console.error("Error fetching employees:", error.message);
		}
	};
	const getEmployeeById = async (id) => {
		try {
			const response = await customAxios().get(`/employees/${id}`);
			const { data } = response;
			// Do something with the employees' data here.
			setSelectedEmployee(data.employee);
		} catch (error) {
			// Handle any errors that might occur during the API request.
			console.error("Error fetching employee:", error.message);
		}
	};
	const deleteEmployee = async (id) => {
		try {
			const response = await customAxios().delete(`/employees/${id}/delete`);
			const deletedID = response.data.id;
			setEmployees(employees.filter((emp) => emp.id != deletedID));
		} catch (error) {
			// Do something with the employees' data here.
			// Handle any errors that might occur during the API request.
			console.error("Error deleting employee:", error.message);
		}
	};

	const editEmployee = async (id, data) => {
		try {
			const response = await customAxios().put(`/employees/${id}/edit`, data);
			const employees = response.data.employees;
			setEmployees(employees);
		} catch (error) {
			// Do something with the employees' data here.
			// Handle any errors that might occur during the API request.
			console.error("Error editing employee:", error.message);
		}
	};
	const addEmployeeToLocation = async (id, data) => {
		try {
			const response = await customAxios().put(`/employees/${id}/edit`, data);
			const employees = response.data.employees;
			setEmployees(employees);
		} catch (error) {
			// Do something with the employees' data here.
			// Handle any errors that might occur during the API request.
			console.error("Error editing employee:", error.message);
		}
	};

	return (
		<EmployeeContext.Provider
			value={{
				employees,
				getEmployees,
				setEmployees,
				employeeLoading,
				deleteEmployee,
				editEmployee,
				selectedEmployee,
				getEmployeeById,
			}}>
			{children}
		</EmployeeContext.Provider>
	);
};

export { EmployeeContext, EmployeeContextProvider };
