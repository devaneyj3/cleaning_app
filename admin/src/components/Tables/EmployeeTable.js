import { EmployeeContext } from "@/app/context/EmployeeContext";
import React, { useContext } from "react";

import moment from "moment";
import styles from "./table.module.css";
import CustomCheckbox from "../CustomCheckbox";

import { useRouter } from "next/navigation";

function EmployeeTable({ employees }) {
	const { employeeFields } = useContext(EmployeeContext);
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

export default EmployeeTable;
