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

function CustomModal({ isOpen, toggle, title, msg, fields, onSave }) {
	const [formData, setFormData] = useState({});
	const [invalidFields, setInvalidFields] = useState([]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = type === "checkbox" ? checked : value;
		console.log(newValue);

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: newValue,
		}));
	};

	const save = () => {
		const requiredFields = fields.filter((f) => f.required).map((f) => f.name);
		const emptyFields = requiredFields.filter((field) => !formData[field]);
		setInvalidFields(emptyFields);
		if (emptyFields.length === 0 && onSave) {
			onSave(formData);
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
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody>
					{msg && <Alert color="success">{msg}</Alert>}
					<Form>
						{fields.map((field, index) => {
							console.log(field.id);
							return (
								<FormGroup
									key={index}
									className={
										field.type === "checkbox" ? `${styles.checkbox_group}` : ""
									}>
									<Label
										for={field.name}
										className={
											field.type === "checkbox"
												? `${styles.checkbox_label}`
												: ""
										}>
										{field.label}
									</Label>
									{field.type !== "checkbox" && (
										<>
											<Input
												id={field.name}
												name={field.name}
												type={field.type}
												value={formData[field.name] || ""}
												pattern={field.pattern}
												onChange={handleChange}
												className={isInvalidField(field.name) ? "invalid" : ""}
											/>
										</>
									)}
									{field.type === "checkbox" && (
										<div className={styles.list}>
											<Input
												id={field.id}
												name={field.name}
												type={field.type}
												checked={formData[field.name] || false}
												onChange={handleChange}
												className={isInvalidField(field.name) ? "invalid" : ""}
											/>
										</div>
									)}
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

export default CustomModal;
