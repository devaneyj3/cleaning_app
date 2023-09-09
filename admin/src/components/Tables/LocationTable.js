import React, { useContext } from "react";
import styles from "./table.module.css";
import CustomCheckbox from "../CustomCheckbox";
import { LocationContext } from "@/app/context/LocationContext";
import { useRouter } from "next/navigation";

function LocationTable({ locations }) {
	const { locationFields } = useContext(LocationContext);
	const router = useRouter();

	//#region NAVIGATE TO LOCATION PAGE
	const handleRowClick = (id) => {
		router.push(`location/${id}`);
	};

	//#endregion

	//#region TABLE HEADERS
	// Generate table headers from the locationFields array
	const tableHeaders = locationFields.map((field) => (
		<th key={field.name}>{field.label}</th>
	));

	//#endregion

	//#region TABLE ROWS
	// Generate table rows from the employee data
	const tableRows = locations.map((location, index) => (
		<tr key={index} onClick={() => handleRowClick(location.id)}>
			{locationFields.map((field) => (
				<td key={field.name}>{location[field.name]}</td>
			))}
		</tr>
	));

	//#endregion

	return (
		<table className={styles.table}>
			<thead>
				<tr>{tableHeaders}</tr>
			</thead>
			<tbody>{tableRows}</tbody>
		</table>
	);
}

export default LocationTable;
