"use client";

import { useState } from "react";

import DataTable from "@/components/table";

import "./dashboard.css";
import CustomButton from "@/components/CustomButton/CustomButton";

import { Alert } from "reactstrap";
import CustomModal from "@/components/Modal/Modal";

export default function Dashboard() {
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<main>
			<h1>Welcome to your dashboard</h1>
			<p>You can create your employees, locations, and products</p>
			<DataTable />
			<CustomButton text="Create Employee" onClick={toggle} />
			<CustomModal isOpen={modal} toggle={toggle} />
		</main>
	);
}
