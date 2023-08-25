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
import React, { useState } from "react";

import styles from "./modal.module.css";

function CustomModal({
	isOpen,
	toggle,
	title,
	msg,
	fields,
	checkboxArr,
	onSave,
}) {
	const [formData, setFormData] = useState({});
	const [invalidFields, setInvalidFields] = useState([]);
	const [checkedLocations, setCheckedLocations] = useState([]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (type !== "checkbox") {
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: value,
			}));
		}

		if (type === "checkbox") {
			if (checked) {
				setCheckedLocations((prevChecked) => [...prevChecked, name]);
			} else {
				setCheckedLocations((prevChecked) =>
					prevChecked.filter((locationId) => locationId !== name)
				);
			}
		}
	};

	const save = () => {
		const requiredFields = fields.filter((f) => f.required).map((f) => f.name);
		const emptyFields = requiredFields.filter((field) => !formData[field]);
		setInvalidFields(emptyFields);

		// At least one checkbox is checked
		if (emptyFields.length === 0 && onSave && checkedLocations.length > 0) {
			onSave(formData, checkedLocations);
			// Reset individual fields of formData
			const resetData = {};
			for (const fieldName of requiredFields) {
				resetData[fieldName] = null;
			}
			setFormData(resetData);
			setCheckedLocations([]);
		}
	};

	const isInvalidField = (fieldName) => invalidFields.includes(fieldName);

	return (
		<div>
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody>
					{msg && <Alert color="success">{msg}</Alert>}
					<Form>
						{fields.map((field, index) => {
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
						{checkboxArr &&
							checkboxArr.map((location) => {
								return (
									<>
										<FormGroup
											key={location.id}
											className={styles.checkbox_group}>
											<div className={styles.list}>
												<Label
													className={styles.checkbox_label}
													for={location.id}>
													{location.label}
												</Label>
												<Input
													id={location.id}
													name={location.id}
													type="checkbox"
													onChange={handleChange}
													className={
														isInvalidField(location.id) ? "invalid" : ""
													}
												/>
											</div>
											{invalidFields.includes("checkboxes") && (
												<FormText className="invalid-text">
													Please select at least one checkbox.
												</FormText>
											)}
										</FormGroup>
									</>
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

export default CustomModal;
