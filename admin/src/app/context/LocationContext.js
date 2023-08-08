"use client";

import React, { createContext, useState } from "react";

import customAxios from "@/utils/CustomAxios";

const LocationContext = createContext();

const LocationContextProvider = ({ children }) => {
	const [location, setLocations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedLocation, setSelectedLocation] = useState(null);

	const getLocations = async () => {
		try {
			const response = await customAxios().get("/locations");
			const location = response.data;
			// Do something with the employees' data here.
			setLocations(location.location);
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
			// Do something with the employees' data here.
			setSelectedLocation(data.location);
		} catch (error) {
			// Handle any errors that might occur during the API request.
			console.error("Error fetching locations:", error.message);
		}
	};
	const deleteLocation = async (id) => {
		try {
			const response = await customAxios().delete(`/location/${id}/delete`);
			const deletedID = response.data.id;
			setLocations(location.filter((loc) => loc.id != deletedID));
		} catch (error) {
			// Do something with the employees' data here.
			// Handle any errors that might occur during the API request.
			console.error("Error deleting location:", error.message);
		}
	};

	const editLocation = async (id, data) => {
		try {
			const response = await customAxios().put(`/location/${id}/edit`, data);
			const locations = response.data.locations;
			setEmployees(locations);
		} catch (error) {
			// Do something with the employees' data here.
			// Handle any errors that might occur during the API request.
			console.error("Error editing location:", error.message);
		}
	};

	return (
		<LocationContext.Provider
			value={{
				location,
				getLocations,
				setLocations,
				loading,
				deleteLocation,
				editLocation,
				selectedLocation,
				getLocationById,
			}}>
			{children}
		</LocationContext.Provider>
	);
};

export { LocationContext, LocationContextProvider };
