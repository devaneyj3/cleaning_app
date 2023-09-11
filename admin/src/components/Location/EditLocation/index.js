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

function EditLocation({ selectedRowToEdit }) {
	const [editedData, setEditedData] = useState({});

	const { toggle, modal, editLocation, locations, locationLabelArray } =
		useContext(LocationContext);

	const handleSave = () => {
		editLocation(selectedRowToEdit, editedData);
		setEditedData({});
	};

	const handleChange = (e) => {
		const { value, name } = e.target;
		setEditedData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>Edit Location</ModalHeader>
			<ModalBody>
				{locationLabelArray.map((lb, index) => {
					const values = Object.values(locations);
					const keys = Object.keys(locations);
					console.log(lb, values, keys);
					return (
						<FormGroup key={lb}>
							<Label for={lb}>{lb}</Label>
							<Input
								type="text"
								id={lb}
								name={keys[index + 1]}
								placeholder={values[index + 1]}
								value={editedData[keys[index + 1]] || ""}
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

export default EditLocation;
