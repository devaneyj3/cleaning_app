"use client";

import React, { useEffect, useContext } from "react";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/Modal/Modal";
import { LocationContext } from "@/app/context/LocationContext";
import LocationTable from "../Tables/LocationTable";

export default function Location() {
	const { locations, getLocations, SaveLocation, loading, modal, msg, toggle } =
		useContext(LocationContext);

	useEffect(() => {
		getLocations();
	}, []);

	if (loading) {
		return <p>Loading Locations...</p>; // Display a loading message while waiting for data
	}

	return (
		<main>
			<p>You have {locations.length} accounts</p>
			{locations.length > 0 ? (
				<LocationTable locations={locations} />
			) : (
				<p>Create your first location to get started</p>
			)}
			<CustomButton text="Create Location" onClick={toggle} />
			{/* <CustomModal
				isOpen={modal}
				toggle={toggle}
				title="Create Location"
				msg={msg}
				fields={locationFields}
				onSave={SaveLocation}
			/> */}
		</main>
	);
}
