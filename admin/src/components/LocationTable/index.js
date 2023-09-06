"use client";

import React, { useEffect, useContext } from "react";

import DataTable from "@/components/table";
import CustomButton from "@/components/CustomButton/CustomButton";

import CustomModal from "@/components/Modal/Modal";

import { LocationContext } from "@/app/context/LocationContext";

export default function LocationTable() {
	const {
		locations,
		getLocations,
		SaveLocation,
		loading,
		modal,
		msg,
		deleteLocation,
		editLocation,
		toggle,
	} = useContext(LocationContext);

	useEffect(() => {
		getLocations();
	}, []);

	if (loading) {
		return <p>Loading Locations...</p>; // Display a loading message while waiting for data
	}

	const locationFields = [
		{ name: "name", label: "Name", type: "text", required: true },
		{ name: "address", label: "Address", type: "text", required: true },
		{ name: "phone", label: "Phone", type: "text", required: true },
		{ name: "city", label: "City", type: "text", required: true },
		{ name: "state", label: "State", type: "text", required: true },
		{
			name: "zip",
			label: "Zip",
			title: "Please enter a Zip Code",
			pattern: "^s*?d{5}(?:[-s]d{4})?s*?$",
			type: "number",
			required: true,
		},
	];

	const locationLabelsArray = locationFields.map((field) => field.label);
	return (
		<main>
			<p>You have {locations.length} accounts</p>
			{locations.length > 0 ? (
				<>
					<DataTable
						rows={locations}
						headers={locationLabelsArray}
						api="locations"
						deleteEntry={deleteLocation}
						editEntry={editLocation}
					/>
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
