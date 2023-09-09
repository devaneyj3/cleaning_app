import React, { useState } from "react";

import CustomEditModal from "../CustomEditModal";

const DataTable = ({ , headers, editEntry, checkboxes }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

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
