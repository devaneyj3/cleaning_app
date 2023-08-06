import React, { use, useContext, useState } from "react";
import { MyContext } from "@/app/context";
import styles from "./table.module.css";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation"; // Import useRouter

const DataTable = ({ data }) => {
	const [editRowIndex, setEditRowIndex] = useState(-1); // Add state to track the row being edited
	const [editedData, setEditedData] = useState({}); // Add state to store the edited data

	const [editMode, setEditMode] = useState(false);
	const { deleteEmployee, edit } = useContext(MyContext);

	const router = useRouter();
	const deleteRow = (e, id) => {
		e.stopPropagation(); // Stop the event propagation to prevent row click

		deleteEmployee(id);
	};

	const handleRowClick = (id, row) => {
		if (!editMode) {
			router.push(`/employee/${id}`);
		} else {
			return;
		}
	};
	const handleEditClick = (e, index) => {
		setEditMode(true);
		e.stopPropagation(); // Stop the event propagation to prevent row click

		setEditRowIndex(index); // Set the index of the row being edited
	};

	const handleInputChange = (e, field) => {
		// Update the edited data when an input field value changes
		const { value } = e.target;
		setEditedData((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleSaveClick = (id) => {
		// Save the edited data here (you need to implement the save logic)
		edit(id, editedData);
		setEditMode(false);

		// Reset the edit mode after saving
		setEditRowIndex(-1);
		setEditedData({});
	};

	// if (editRowIndex == -1) {
	// 	setEditMode(false);
	// }

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Hourly Pay</th>
					<th>Position</th>
					<th>Date Hired</th>
					<th>Action</th> {/* Add a new header for actions */}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => {
					const dateHired = new Date(row.dateHired);
					const options = { year: "numeric", month: "long", day: "numeric" };
					const readableDate = dateHired.toLocaleDateString(undefined, options);

					console.log(readableDate);

					return (
						<tr key={index} onClick={() => handleRowClick(row.id, row)}>
							<td>{row.id}</td>
							<td>
								{editRowIndex === index ? (
									<input
										type="text"
										value={editedData.name || row.name}
										onChange={(e) => handleInputChange(e, "name")}
									/>
								) : (
									row.name
								)}
							</td>
							<td>
								{editRowIndex === index ? (
									<input
										type="text"
										value={editedData.email || row.email}
										onChange={(e) => handleInputChange(e, "email")}
									/>
								) : (
									row.email
								)}
							</td>
							<td>
								{editRowIndex === index ? (
									<input
										type="text"
										value={editedData.phone || row.phone}
										onChange={(e) => handleInputChange(e, "phone")}
									/>
								) : (
									row.phone
								)}
							</td>
							<td>
								{editRowIndex === index ? (
									<input
										type="number"
										value={editedData.hourly_pay || row.hourly_pay}
										onChange={(e) => handleInputChange(e, "hourly_pay")}
									/>
								) : (
									`$${row.hourly_pay}/hr`
								)}
							</td>
							<td>
								{editRowIndex === index ? (
									<input
										type="text"
										value={editedData.position || row.position}
										onChange={(e) => handleInputChange(e, "position")}
									/>
								) : (
									row.position
								)}
							</td>
							<td>
								{editRowIndex === index ? (
									<input
										type="date"
										value={editedData.dateHired || readableDate}
										onChange={(e) => handleInputChange(e, "dateHired")}
									/>
								) : (
									readableDate
								)}
							</td>
							<td>
								{editRowIndex === index ? (
									<button onClick={() => handleSaveClick(row.id)}>Save</button> // Add a Save button when in edit mode
								) : (
									<>
										<MdDeleteForever
											color="red"
											onClick={(event) => deleteRow(event, row.id)}
										/>
										<MdEdit
											color="blue"
											onClick={(event) => handleEditClick(event, index)}
										/>
									</>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default DataTable;
