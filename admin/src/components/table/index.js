import React, { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import styles from "./table.module.css";

import { useRouter } from "next/navigation";
import CustomEditModal from "../CustomEditModal";

const DataTable = ({ rows, headers, deleteEntry, editEntry, api }) => {
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editItemId, setEditItemId] = useState(null);
	const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);

	const handleRowClick = (id) => {
		if (api == "employees") router.push(`employee/${id}`);
		if (api == "locations") router.push(`location/${id}`);
		if (api == "products") router.push(`product/${id}`);
	};

	const deleteRow = (e, id) => {
		e.stopPropagation();
		deleteEntry(id);
	};

	const editRow = (e, row) => {
		e.stopPropagation();
		setEditItemId(row.id);
		setSelectedRowToEdit(row);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditItemId(null);
	};

	return (
		<>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Id</th>
						{headers.map((header, index) => (
							<th key={index}>{header}</th>
						))}
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row, index) => {
						const values = Object.values(row);
						return (
							<tr key={index} onClick={() => handleRowClick(row.id)}>
								{values.map((row, index) => {
									return <td key={index}>{row}</td>;
								})}
								<td key="actions">
									<MdDeleteForever
										color="red"
										onClick={(event) => deleteRow(event, row.id)}
									/>
									<MdEdit
										color="blue"
										onClick={(event) => editRow(event, row)}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{selectedRowToEdit && (
				<CustomEditModal
					isOpen={isModalOpen}
					toggle={closeModal}
					headers={headers}
					title="Edit Item"
					row={selectedRowToEdit}
					onSave={(editedData) => {
						// Handle saving the edited data here
						editEntry(editItemId, editedData);
						closeModal(); // Close the modal after saving
					}}
				/>
			)}
		</>
	);
};

export default DataTable;
