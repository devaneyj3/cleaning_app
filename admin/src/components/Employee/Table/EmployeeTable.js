import { EmployeeContext } from "@/app/context/EmployeeContext";
import React, { useContext, useState } from "react";

import moment from "moment";
import styles from "./table.module.css";
import { MdDeleteForever, MdEdit } from "react-icons/md";

import { useRouter } from "next/navigation";
import EditEmployee from "@/components/Employee/EditEmployee";

function EmployeeTable({}) {
	//#region STATE
	const [selectedEmployeeRowToEdit, setSelecteEmployeedRowToEdit] =
		useState(null);
	const [isEmployeeEditModalOpen, setIsEmployeeEditModalOpen] = useState(false);

	//#endregion

	//#region CONTEXT
	const { employeeFields, deleteEmployee, employees } =
		useContext(EmployeeContext);

	//#endregion

	const router = useRouter();

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
		setSelecteEmployeedRowToEdit(employee);
		setIsEmployeeEditModalOpen(true);
	};
	//#endregion

	const closeEmployeeEditModal = () => {
		setIsEmployeeEditModalOpen(false);
		setSelecteEmployeedRowToEdit(null);
	};

	return (
		<>
			<table className={styles.table}>
				<thead>
					<tr>{tableHeaders}</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</table>
			{selectedEmployeeRowToEdit && (
				<EditEmployee
					selectedEmployeeRowToEdit={selectedEmployeeRowToEdit}
					isEmployeeEditModalOpen={isEmployeeEditModalOpen}
					closeEmployeeEditModal={closeEmployeeEditModal}
				/>
			)}
		</>
	);
}

export default EmployeeTable;
