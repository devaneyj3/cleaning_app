import React, { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";

const DataTable = ({ data, labels, onEdit, onDelete }) => {
	const [editRowIndex, setEditRowIndex] = useState(-1);
	const [editedData, setEditedData] = useState({});
	const [editMode, setEditMode] = useState(false);

	const router = useRouter();

	const deleteRow = (e, id) => {
		e.stopPropagation();
		onDelete(id);
	};

	const handleRowClick = (id, row) => {
		if (!editMode) {
			router.push(`/employee/${id}`);
		}
	};

	const handleEditClick = (e, index) => {
		setEditMode(true);
		e.stopPropagation();
		setEditRowIndex(index);
	};

	const handleInputChange = (e, field) => {
		const { value } = e.target;
		setEditedData((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleSaveClick = (id) => {
		onEdit(id, editedData);
		setEditMode(false);
		setEditRowIndex(-1);
		setEditedData({});
	};

	const renderInputField = (field, index, value, onChange) => {
		if (editRowIndex === index) {
			return (
				<input
					type={field.type}
					value={value}
					onChange={(e) => onChange(e, field.name)}
				/>
			);
		} else {
			return value;
		}
	};

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					{labels.map((label) => (
						<th key={label}>{label}</th>
					))}
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => (
					<tr key={index} onClick={() => handleRowClick(row.id, row)}>
						{labels.map((field) => (
							<td key={field.name}>
								{renderInputField(
									field,
									editRowIndex === index
										? editedData[field.name] || row[field.name]
										: row[field.name],
									handleInputChange
								)}
							</td>
						))}
						<td>
							{editRowIndex === index ? (
								<button onClick={() => handleSaveClick(row.id)}>Save</button>
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
				))}
			</tbody>
		</table>
	);
};

export default DataTable;
