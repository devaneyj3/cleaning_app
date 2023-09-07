import React, { useState } from "react";
import {
	Modal,
	FormGroup,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Label,
	Input,
} from "reactstrap";

function CustomEditModal({ isOpen, toggle, title, onSave, row, headers }) {
	const [editedData, setEditedData] = useState(""); // State to store edited data

	const handleSave = () => {
		onSave(editedData);
	};

	const handleChange = (e) => {
		setEditedData(e.target.value);
	};
	console.log(row);
	return (
		<Modal isOpen={isOpen} toggle={toggle}>
			<ModalHeader toggle={toggle}>{title}</ModalHeader>
			<ModalBody>
				{headers.map((lb, index) => {
					const values = Object.values(row);
					return (
						<FormGroup>
							<Label for={lb}>{lb}</Label>
							<Input
								type="text"
								id="editInput"
								placeholder={values[index + 1]}
								value={editedData}
								onChange={handleChange}
							/>
						</FormGroup>
					);
				})}
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
