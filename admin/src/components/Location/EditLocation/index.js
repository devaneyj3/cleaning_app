import React, { useContext, useState } from "react";
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
import { LocationContext } from "@/app/context/LocationContext";

function EditLocation({
	selectedLocationRowToEdit,
	isLocationEditModalOpen,
	closeLocationEditModal,
}) {
	const [editedData, setEditedData] = useState({});

	const { editLocation, locationLabelArray } = useContext(LocationContext);

	const handleSave = () => {
		editLocation(selectedLocationRowToEdit, editedData);
		setEditedData({});
		closeLocationEditModal();
	};

	const handleChange = (e) => {
		const { value, name } = e.target;
		console.log(name, value);
		setEditedData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<Modal isOpen={isLocationEditModalOpen} toggle={closeLocationEditModal}>
			<ModalHeader toggle={closeLocationEditModal}>Edit Location</ModalHeader>
			<ModalBody>
				{locationLabelArray.map((lb, index) => {
					const values = Object.values(selectedLocationRowToEdit);
					const keys = Object.keys(selectedLocationRowToEdit);
					let placeholder = values[index + 1];
					placeholder = placeholder.toString();
					console.log(keys[index + 1]);
					const value = editedData[keys[index + 1]];
					const name = lb.toLowerCase();
					return (
						<FormGroup key={lb}>
							<Label for={lb}>{lb}</Label>
							<Input
								type="text"
								id={lb}
								name={name}
								placeholder={placeholder}
								value={value}
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
				<Button color="secondary" onClick={closeLocationEditModal}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default EditLocation;
