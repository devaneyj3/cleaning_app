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

import CustomCheckbox from "../CustomCheckbox";
import { EmployeeContext } from "@/app/context/EmployeeContext";
import { LocationContext } from "@/app/context/LocationContext";

function CreateEmployee() {
	const [formData, setFormData] = useState({});
	const [invalidFields, setInvalidFields] = useState([]);
	const [checkedLocations, setCheckedLocations] = useState([]);

	const { modal, toggle, msg, employeeFields, SaveEmployee } =
		useContext(EmployeeContext);

	const { locations } = useContext(LocationContext);

	// Add checkboxes for locations dynamically
	const checkboxArr = Object.values(locations).map((locationName) => ({
		...locationName,
		name: `${locationName.name}`,
		label: `${locationName.name} - ${locationName.city}`,
		type: "checkbox",
		required: false,
	}));

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const save = () => {
		const requiredFields = employeeFields
			.filter((f) => f.required)
			.map((f) => f.name);
		const emptyFields = requiredFields.filter((field) => !formData[field]);
		setInvalidFields(emptyFields);

		// At least one checkbox is checked
		if (emptyFields.length === 0 || checkedLocations.length > 0) {
			SaveEmployee(formData, checkedLocations);
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
				<ModalHeader toggle={toggle}>Create an employee</ModalHeader>
				<ModalBody>
					{msg && <Alert color="success">{msg}</Alert>}
					<Form>
						{employeeFields.map((field, index) => {
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
						{checkboxArr && (
							<Label for="Checkboxes">
								Plese pick a location to assign the employee too
							</Label>
						)}
						<CustomCheckbox
							id="Checkboxes"
							checkboxArr={checkboxArr}
							setCheckedLocations={setCheckedLocations}
						/>
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

export default CreateEmployee;
