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
	selectedLocationRow = {}, // Make sure this prop is correctly passed
	isLocationEditModalOpen, // Make sure this prop is correctly passed
	closeLocationEditModal, // Make sure this prop is correctly passed
}) {
	const [editedData, setEditedData] = useState({});

	const { editLocation, locationLabelArray } = useContext(LocationContext);

	const handleSave = () => {
		editLocation(selectedLocationRow.id, editedData);
		setEditedData({});
		closeLocationEditModal();
	};

	const handleChange = (e) => {
		const { value, name } = e.target;
		setEditedData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<Modal isOpen={isLocationEditModalOpen} toggle={closeLocationEditModal}>
			<ModalHeader toggle={closeLocationEditModal}>Edit Location</ModalHeader>
			<ModalBody>
				{locationLabelArray.map((lb) => {
					let key = lb.toLowerCase(); // Convert key to lowercase
					if (key == "employees needed") {
						key = "employees_needed";
					}
					const value = selectedLocationRow[key]; // Use the key to access the value
					return (
						<FormGroup key={lb}>
							<Label for={key}>{lb}</Label>
							<Input
								type="text"
								id={key}
								name={key}
								placeholder={value} // Use the value as the placeholder
								value={editedData[key] || ""}
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
