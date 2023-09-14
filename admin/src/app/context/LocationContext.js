"use client";

import React, { createContext, useState } from "react";

import customAxios from "@/utils/CustomAxios";

const LocationContext = createContext();

const LocationContextProvider = ({ children }) => {
	const [locations, setLocations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [modal, setModal] = useState(false);
	const [msg, setMsg] = useState("");

	const locationFields = [
		{ name: "name", label: "Name", type: "text", required: true },
		{ name: "address", label: "Address", type: "text", required: true },
		{ name: "phone", label: "Phone", type: "text", required: true },
		{ name: "city", label: "City", type: "text", required: true },
		{ name: "state", label: "State", type: "text", required: true },
		{
			name: "employees_needed",
			label: "Employees Needed",
			type: "number",
			required: true,
		},
		{
			name: "zip",
			label: "Zip",
			title: "Please enter a Zip Code",
			pattern: "^s*?d{5}(?:[-s]d{4})?s*?$",
			type: "number",
			required: true,
		},
	];

	let locationLabelArray;
	if (locations.length > 0) {
		locationLabelArray = locationLabelArray = locationFields.reduce(
			(acc, field) => {
				acc.push(field.label);
				return acc;
			},
			[]
		);
	}

	const toggle = () => setModal(!modal);

	const getLocations = async () => {
		try {
			const response = await customAxios().get("/locations");
			const locations = response.data;
			console.log(locations);
			// Do something with the employees' data here.
			setLocations(locations.locations);
			setLoading(false);
		} catch (error) {
			// Handle any errors that might occur during the API request.
			console.error("Error fetching locations:", error.message);
		}
	};
	const getLocationById = async (id) => {
		try {
			const response = await customAxios().get(`/locations/${id}`);
			const { data } = response;
			setSelectedLocation(data.location);
		} catch (error) {
			// Handle any errors that might occur during the API request.
			console.error("Error fetching locations:", error.message);
		}
	};

	const SaveLocation = async (formData) => {
		try {
			const response = await customAxios().post("/locations", formData);
			// Assuming the response contains the success message from the server.

			setLocations(response.data.locations);

			setMsg("Successfully added location");
			setTimeout(() => {
				toggle();
				setMsg("");
			}, 1000);
		} catch (error) {
			console.error("Error posting data:", error);
		}
	};

	const deleteLocation = async (id) => {
		try {
			const response = await customAxios().delete(`/locations/${id}/delete`);
			const deletedID = response.data.id;
			setLocations(locations.filter((loc) => loc.id != deletedID));
		} catch (error) {
			console.error("Error deleting location:", error.message);
		}
	};

	const editLocation = async (id, data) => {
		try {
			const response = await customAxios().put(`/locations/${id}/edit`, data);
			const locations = response.data.locations;
			setLocations(locations);
		} catch (error) {
			console.error("Error editing location:", error.message);
		}
	};

	return (
		<LocationContext.Provider
			value={{
				locations,
				getLocations,
				setLocations,
				loading,
				deleteLocation,
				editLocation,
				selectedLocation,
				getLocationById,
				SaveLocation,
				modal,
				msg,
				toggle,
				locationFields,
				locationLabelArray,
			}}>
			{children}
		</LocationContext.Provider>
	);
};

export { LocationContext, LocationContextProvider };
