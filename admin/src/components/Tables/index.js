import React, { useState } from "react";

import CustomEditModal from "../CustomEditModal";

const DataTable = ({
	rows,
	headers,
	deleteEntry,
	editEntry,
	api,
	checkboxes,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editItemId, setEditItemId] = useState(null);
	const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);

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
};

export default DataTable;
