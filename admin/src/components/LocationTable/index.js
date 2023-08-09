"use client";

import React, { useEffect, useContext, useState } from "react";

import DataTable from "@/components/table";
import CustomButton from "@/components/CustomButton/CustomButton";

import CustomModal from "@/components/Modal/Modal";

import customAxios from "@/utils/CustomAxios";
import { LocationContext } from "@/app/context/LocationContext";

export default function LocationTable() {
	const [modal, setModal] = useState(false);
	const [msg, setMsg] = useState("");
	const { locations, getLocations, setLocations, loading } =
		useContext(LocationContext);

	useEffect(() => {
		getLocations();
	}, []);
	const toggle = () => setModal(!modal);

	if (loading) {
		return <div>Loading Locations...</div>; // Display a loading message while waiting for data
	}

	const locationFields = [
		{ name: "Name", label: "Name", type: "text", required: true },
		{ name: "Address", label: "Address", type: "text", required: true },
		{ name: "Phone", label: "Phone", type: "text", required: true },
		{ name: "City", label: "City", type: "text", required: true },
		{ name: "State", label: "State", type: "text", required: true },
		{
			name: "Zip",
			label: "Zip",
			title: "Please enter a Zip Code",
			pattern: "^s*?d{5}(?:[-s]d{4})?s*?$",
			type: "number",
			required: true,
		},
	];

	const locationLabelsArray = locationFields.map((field) => field.label);

	locationLabelsArray[0] = "ID";
	const SaveLocation = async (formData) => {
		try {
			const response = await customAxios().post("/locations", formData);
			// Assuming the response contains the success message from the server.
			setLocations(response.data.locations);
			console.log(response.data.locations);
			setMsg("Successfully added location");
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
			{locations && locations.length > 0 ? (
				<>
					<p>You have {locations.length} accounts</p>
					<DataTable data={locations} labels={locationLabelsArray} />
				</>
			) : (
				<p>Create your first location to get started</p>
			)}
			<CustomButton text="Create Location" onClick={toggle} />
			<CustomModal
				isOpen={modal}
				toggle={toggle}
				title="Create Location"
				msg={msg}
				fields={locationFields}
				onSave={SaveLocation}
			/>
		</main>
	);
}
