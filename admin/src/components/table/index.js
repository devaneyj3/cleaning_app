import React, { useContext, useState } from "react";
import { MyContext } from "@/app/context";
import styles from "./table.module.css";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation"; // Import useRouter

const DataTable = ({ data }) => {
	const { deleteEmployee, edit, setSelectedEmployee } = useContext(MyContext);
	const router = useRouter();
	const deleteRow = (id) => {
		deleteEmployee(id);
	};

	const [editRowIndex, setEditRowIndex] = useState(-1); // Add state to track the row being edited
	const [editedData, setEditedData] = useState({}); // Add state to store the edited data

	const handleRowClick = (id, row) => {
		setSelectedEmployee({ ...row });
		router.push(`/employee/${id}`);
	};
	const handleEditClick = (index) => {
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

		// Reset the edit mode after saving
		setEditRowIndex(-1);
		setEditedData({});
	};

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
					<th>Action</th> {/* Add a new header for actions */}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => (
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
								<button onClick={() => handleSaveClick(row.id)}>Save</button> // Add a Save button when in edit mode
							) : (
								<>
									<MdDeleteForever
										color="red"
										onClick={() => deleteRow(row.id)}
									/>
									<MdEdit color="blue" onClick={() => handleEditClick(index)} />
								</>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default DataTable;
