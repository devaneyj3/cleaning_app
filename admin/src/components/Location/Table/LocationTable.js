import React, { useContext, useState } from "react";
import styles from "./table.module.css";
import { LocationContext } from "@/app/context/LocationContext";
import { useRouter } from "next/navigation";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import EditLocation from "../EditLocation";

function LocationTable({ locations = {} }) {
	//#region STATE
	const [selectedLocationRowToEdit, setSelectedLocationRowToEdit] =
		useState(null);
	const [isLocationEditModalOpen, setIsLocationEditModalOpen] = useState(false);
	//#endregion

	//#region CONTEXT
	const { locationFields, deleteLocation } = useContext(LocationContext);

	//#endregion

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
			<td>
				<MdDeleteForever
					color="red"
					onClick={(event) => deleteRow(event, location.id)}
				/>
				<MdEdit color="blue" onClick={(event) => editRow(event, location)} />
			</td>
		</tr>
	));

	//#endregion

	//#region DELETE ROW
	const deleteRow = (e, id) => {
		e.stopPropagation();
		deleteLocation(id);
	};
	//#endregion

	//#region EDIT ROW
	const editRow = (e, location) => {
		e.stopPropagation();
		setIsLocationEditModalOpen(true);
		setSelectedLocationRowToEdit(location);
	};
	//#endregion

	const closeLocationEditModal = () => {
		setIsLocationEditModalOpen(false);
		setSelectedLocationRowToEdit(null);
	};

	return (
		<>
			<table className={styles.table}>
				<thead>
					<tr>{tableHeaders}</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</table>
			{selectedLocationRowToEdit && (
				<EditLocation
					selectedLocationRow={selectedLocationRowToEdit}
					isLocationEditModalOpen={isLocationEditModalOpen}
					closeLocationEditModal={closeLocationEditModal}
				/>
			)}
		</>
	);
}

export default LocationTable;
