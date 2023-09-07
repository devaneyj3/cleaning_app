import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

function CustomEditModal({ isOpen, toggle, title, onSave, itemId }) {
	const [editedData, setEditedData] = useState(""); // State to store edited data

	const handleSave = () => {
		// Handle saving the edited data
		onSave(editedData);
	};

	const handleChange = (e) => {
		// Update the editedData state when the input changes
		setEditedData(e.target.value);
	};

	return (
		<Modal isOpen={isOpen} toggle={toggle}>
			<ModalHeader toggle={toggle}>{title}</ModalHeader>
			<ModalBody>
				<label htmlFor="editInput">Edit Data:</label>
				<input
					type="text"
					id="editInput"
					value={editedData}
					onChange={handleChange}
				/>
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={handleSave}>
					Save
				</Button>
				<Button color="secondary" onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default CustomEditModal;
