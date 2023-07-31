"use client";

import React, { createContext, useState } from "react";

import customAxios from "@/utils/CustomAxios";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(true);

	const getEmployees = async () => {
		try {
			const response = await customAxios().get("/employees");
			const employees = response.data;
			// Do something with the employees' data here.
			setEmployees(employees.employee);
			setLoading(false);
			console.log(employees.employee);
		} catch (error) {
			// Handle any errors that might occur during the API request.
			console.error("Error fetching employees:", error.message);
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

	const edit = async (id, data) => {
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
		<MyContext.Provider
			value={{
				employees,
				getEmployees,
				setEmployees,
				loading,
				deleteEmployee,
				edit,
			}}>
			{children}
		</MyContext.Provider>
	);
};

export { MyContext, MyContextProvider };
