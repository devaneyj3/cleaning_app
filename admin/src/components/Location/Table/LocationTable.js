import React, { useContext, useState } from "react";
import styles from "./table.module.css";
import CustomCheckbox from "../../CustomCheckbox";
import { LocationContext } from "@/app/context/LocationContext";
import { useRouter } from "next/navigation";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import CustomEditModal from "@/components/CustomEditModal";

function LocationTable({ locations }) {
	//#region STATE
	const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	//#endregion

	//#region CONTEXT
	const { locationFields, deleteLocation, editLocation, msg, toggle, modal } =
		useContext(LocationContext);

	//#endregion

	const closeModal = () => {
		setIsModalOpen(false);
		setEditItemId(null);
	};

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
		setSelectedRowToEdit(location);
		editLocation(location);
	};
	//#endregion

	return (
		<>
			<table className={styles.table}>
				<thead>
					<tr>{tableHeaders}</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</table>
			{selectedRowToEdit && (
				<CustomEditModal
					isOpen={isModalOpen}
					checkboxes={checkboxes}
					toggle={closeModal}
					headers={headers}
					title="Edit Item"
					row={selectedRowToEdit}
					onSave={(editedData, checkbox) => {
						// Handle saving the edited data here
						editEntry(editItemId, editedData, checkbox);
						closeModal(); // Close the modal after saving
					}}
				/>
			)}
		</>
	);
}

export default LocationTable;
