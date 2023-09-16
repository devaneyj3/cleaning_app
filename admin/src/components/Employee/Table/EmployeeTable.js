import { EmployeeContext } from "@/app/context/EmployeeContext";
import React, { useContext, useState, useEffect, use } from "react";

import moment from "moment";
import styles from "./table.module.css";
import { MdDeleteForever, MdEdit } from "react-icons/md";

import { useRouter } from "next/navigation";
import EditEmployee from "@/components/Employee/EditEmployee";
import { LocationContext } from "@/app/context/LocationContext";

function EmployeeTable({}) {
	//#region STATE
	const [selectedEmployeeRowToEdit, setSelecteEmployeedRowToEdit] =
		useState(null);
	const [isEmployeeEditModalOpen, setIsEmployeeEditModalOpen] = useState(false);

	//#region CONTEXT
	const {
		employeeFields,
		deleteEmployee,
		employees,
		getAllEmployeeLocations,
		allEmployeeLocations,
	} = useContext(EmployeeContext);
	//#endregion

	const { locations } = useContext(LocationContext);

	useEffect(() => {
		getAllEmployeeLocations();
	}, [locations]);

	//#endregion
	const router = useRouter();

	//#region NAVIGATE TO EMPLOYEE PAGE
	const handleRowClick = (id) => {
		router.push(`employee/${id}`);
	};
	//#endregion

	const header = (
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Email</th>
				<th>Phone</th>
				<th>Username</th>
				<th>Password</th>
				<th>Pay</th>
				<th>Position</th>
				<th>Locations</th>
				<th>Hired</th>
				<th>Actions</th>
			</tr>
		</thead>
	);

	//#region TABLE ROWS
	const tableRows = employees.map((employee, index) => {
		const locationIds = allEmployeeLocations
			.filter((el) => el.employee_id === employee.id)
			.map((el) => el.location_id);

		console.log(locationIds);

		return (
			<tr key={index} onClick={() => handleRowClick(employee.id)}>
				<td key="id">{employee.id}</td>
				<td key="name">{employee.name}</td>
				<td key="email">{employee.email}</td>
				<td key="phone">{employee.phone}</td>
				<td key="username">{employee.username}</td>
				<td key="password">{employee.password}</td>
				<td key="pay">{employee.pay}</td>
				<td key="position">{employee.position}</td>
				<td key="location">{locationIds.length}</td>
				<td key="hired">{moment(employee.hired).format("MM/DD/YY")}</td>
				<td>
					<MdDeleteForever
						color="red"
						onClick={(event) => deleteRow(event, employee.id)}
					/>
					<MdEdit color="blue" onClick={(event) => editRow(event, employee)} />
				</td>
			</tr>
		);
	});

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
				{header}
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
