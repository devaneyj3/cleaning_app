// TODO: THIS IS CRAPPY CODE, REDO THIS LATER

import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	FormText,
	Input,
	Label,
	Alert,
} from "reactstrap";
import React, { useContext, useState } from "react";

import { LocationContext } from "@/app/context/LocationContext";

function CreateLocation() {
	const [formData, setFormData] = useState({});
	const [invalidFields, setInvalidFields] = useState([]);

	const { msg, modal, toggle, SaveLocation, locationFields } =
		useContext(LocationContext);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const save = () => {
		const requiredFields = locationFields
			.filter((f) => f.required)
			.map((f) => f.name);
		const emptyFields = requiredFields.filter((field) => !formData[field]);
		setInvalidFields(emptyFields);
		if (emptyFields.length === 0) {
			SaveLocation(formData);
			// Reset individual fields of formData
			const resetData = {};
			for (const fieldName of requiredFields) {
				resetData[fieldName] = null;
			}
			setFormData(resetData);
		}
	};

	const isInvalidField = (fieldName) => invalidFields.includes(fieldName);

	return (
		<div>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Create a Location</ModalHeader>
				<ModalBody>
					{msg && <Alert color="success">{msg}</Alert>}
					<Form>
						{locationFields.map((field, index) => {
							return (
								<FormGroup key={index}>
									<Label for={field.name}>{field.label}</Label>
									<Input
										id={field.name}
										name={field.name}
										type={field.type}
										value={formData[field.name] || ""}
										pattern={field.pattern}
										onChange={handleChange}
										className={isInvalidField(field.name) ? "invalid" : ""}
									/>
									{isInvalidField(field.name) && (
										<FormText className="invalid-text">
											Please fill out this field.
										</FormText>
									)}
								</FormGroup>
							);
						})}
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={save}>
						Save
					</Button>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default CreateLocation;
