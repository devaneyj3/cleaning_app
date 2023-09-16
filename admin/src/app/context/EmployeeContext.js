"use client";

import React, { createContext, useState } from "react";

import customAxios from "@/utils/CustomAxios";

const EmployeeContext = createContext();

const EmployeeContextProvider = ({ children }) => {
	const [employees, setEmployees] = useState([]);
	const [employeeLoading, setLoading] = useState(true);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [employeeLocation, setEmployeeLocation] = useState(null);
	const [modal, setModal] = useState(false);
	const [msg, setMsg] = useState("");
	const [allEmployeeLocations, setAllEmployeeLocation] = useState([]);

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

	let employeeLabelArr;
	if (employees.length > 0) {
		employeeLabelArr = employeeFields.reduce((acc, field) => {
			acc.push(field.label);
			return acc;
		}, []);
	}
	const toggle = () => setModal(!modal);

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
			getEmployeesLocations(id);
		} catch (error) {
			// Handle any errors that might occur during the API request.
			console.error("Error fetching employee:", error.message);
		}
	};
	const getAllEmployeeLocations = async () => {
		try {
			const response = await customAxios().get(`/employee-locations`);
			const { data } = response;
			console.log("employee locations response", data);

			setAllEmployeeLocation(data);
		} catch (error) {
			// Handle any errors that might occur during the API request.
			console.error("Error fetching employee locations:", error.message);
		}
	};

	const SaveEmployee = async (formData, checkedLocations) => {
		try {
			const response = await customAxios().post("/employees", formData);
			// Assuming the response contains the success message from the server.
			const employeeId = response.data.newEmployee.id;

			for (const location of checkedLocations) {
				await SaveLocationToEmployee(employeeId, location.id);
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

	const getEmployeesLocations = async (id) => {
		try {
			const response = await customAxios().get(
				`/employee-locations/${id}/locations`
			);

			const { data } = response;
			setEmployeeLocation(data);
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

	const editEmployee = async (id, data, checkbox) => {
		try {
			console.log(id, data, checkbox);
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
				employeeLocation,
				modal,
				msg,
				toggle,
				SaveEmployee,
				getEmployeesLocations,
				employeeFields,
				employeeLabelArr,
				getAllEmployeeLocations,
				allEmployeeLocations,
			}}>
			{children}
		</EmployeeContext.Provider>
	);
};

export { EmployeeContext, EmployeeContextProvider };
