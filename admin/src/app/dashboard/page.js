"use client";

import React, { useEffect, useState } from "react";

import customAxios from "@/utils/CustomAxios";

import DataTable from "@/components/table";

import "./dashboard.css";
import CustomButton from "@/components/CustomButton/CustomButton";

import CustomModal from "@/components/Modal/Modal";

export default function Dashboard() {
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const [data, setData] = useState([]);

	useEffect(() => {
		const getEmployees = async () => {
			try {
				const response = await customAxios().get("/employees");
				const employees = response.data;
				// Do something with the employees' data here.
				setData(employees.employee);
				console.log(employees.employee);
			} catch (error) {
				// Handle any errors that might occur during the API request.
				console.error("Error fetching employees:", error.message);
			}
		};
		getEmployees();
	}, []);

	return (
		<main>
			<h1>Welcome to your dashboard</h1>
			<p>You can create your employees, locations, and products</p>
			{data.length > 0 ? (
				<DataTable data={data} />
			) : (
				<p>Create your first employee to get started</p>
			)}
			<CustomButton text="Create Employee" onClick={toggle} />
			<CustomModal
				isOpen={modal}
				toggle={toggle}
				title="Create Employee"
				msg="Successfully created employee"
			/>
		</main>
	);
}
