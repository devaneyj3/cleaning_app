"use client";

import React, { useEffect, useContext } from "react";
import CustomButton from "@/components/CustomButton/CustomButton";
import { LocationContext } from "@/app/context/LocationContext";
import LocationTable from "./Table/LocationTable";
import CreateLocation from "./CreateLocation";

export default function Location() {
	const { locations, getLocations, SaveLocation, loading, toggle } =
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
			<CreateLocation />
		</main>
	);
}
