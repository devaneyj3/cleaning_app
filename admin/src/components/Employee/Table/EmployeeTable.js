import { EmployeeContext } from "@/app/context/EmployeeContext";
import React, { useContext, useState } from "react";

import moment from "moment";
import styles from "./table.module.css";
import CustomCheckbox from "../../CustomCheckbox";
import { MdDeleteForever, MdEdit } from "react-icons/md";

import { useRouter } from "next/navigation";
import CustomEditModal from "@/components/CustomEditModal";

function EmployeeTable({ employees }) {
	//#region STATE
	const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	//#endregion

	//#region CONTEXT
	const { employeeFields, deleteEmployee, editEmployee, modal, msg, toggle } =
		useContext(EmployeeContext);

	//#endregion

	const router = useRouter();

	const closeModal = () => {
		setIsModalOpen(false);
		setEditItemId(null);
	};

	//#region NAVIGATE TO EMPLOYEE PAGE
	const handleRowClick = (id) => {
		router.push(`employee/${id}`);
	};
	//#endregion

	//#region TABLE HEADERS
	// Generate table headers from the employeeFields array
	const tableHeaders = employeeFields.map((field) => (
		<th key={field.name}>{field.label}</th>
	));
	//#endregion

	//#region TABLE ROWS
	// Generate table rows from the employee data
	const tableRows = employees.map((employee, index) => (
		<tr key={index} onClick={() => handleRowClick(employee.id)}>
			{employeeFields.map((field) => (
				<td key={field.name}>
					{field.name === "hired"
						? moment(employee[field.name]).format("MM/DD/YYYY")
						: employee[field.name]}
				</td>
			))}
			<td>
				<MdDeleteForever
					color="red"
					onClick={(event) => deleteRow(event, employee.id)}
				/>
				<MdEdit color="blue" onClick={(event) => editRow(event, employee)} />
			</td>
		</tr>
	));

	//#endregion

	//#region	DELETE ROW
	const deleteRow = (e, id) => {
		e.stopPropagation();
		deleteEmployee(id);
	};
	//#endregion

	//#region EDIT ROW
	const editRow = (e, employee) => {
		e.stopPropagation();
		setSelectedRowToEdit(employee);
		editEmployee(employee);
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

export default EmployeeTable;
