"use client";

import { createContext, useState } from "react";

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
	return (
		<MyContext.Provider
			value={{ employees, getEmployees, setEmployees, loading }}>
			{children}
		</MyContext.Provider>
	);
};

export { MyContext, MyContextProvider };
