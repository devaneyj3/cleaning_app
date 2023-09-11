import React, { useState, useContext } from "react";
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
import CustomCheckbox from "../CustomCheckbox";
import { LocationContext } from "@/app/context/LocationContext";
import { EmployeeContext } from "@/app/context/EmployeeContext";

import moment from "moment";

function EditEmployee({
	selectedEmployeeRowToEdit,
	isEmployeeEditModalOpen,
	closeEmployeeEditModal,
}) {
	const [editedData, setEditedData] = useState({});
	const [checkboxValue, setCheckboxValue] = useState([]);

	const { locations } = useContext(LocationContext);
	const { editEmployee, employeeLabelArr } = useContext(EmployeeContext);

	// Add checkboxes for locations dynamically
	const checkboxArr = Object.values(locations).map((locationName) => ({
		...locationName,
		name: `${locationName.name}`,
		label: `${locationName.name} - ${locationName.city}`,
		type: "checkbox",
		required: false,
	}));
	const handleSave = () => {
		editEmployee(selectedEmployeeRowToEdit, editedData, checkboxValue);
		setEditedData({});
		setCheckboxValue([]);
		closeEmployeeEditModal();
	};

	const handleChange = (e) => {
		const { value, name } = e.target;
		setEditedData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<Modal isOpen={isEmployeeEditModalOpen} toggle={closeEmployeeEditModal}>
			<ModalHeader toggle={closeEmployeeEditModal}>Edit Employee</ModalHeader>
			<ModalBody>
				{employeeLabelArr.map((lb, index) => {
					selectedEmployeeRowToEdit.hired = moment(
						selectedEmployeeRowToEdit.hired
					).format("MM/DD/YYYY");

					const values = Object.values(selectedEmployeeRowToEdit);
					const keys = Object.keys(selectedEmployeeRowToEdit);
					let placeholder = values[index + 1];
					placeholder = placeholder.toString();
					const value = editedData[keys[index + 1]] || "";
					const name = lb.toLowerCase();
					console.log(placeholder);
					return (
						<FormGroup key={lb}>
							<Label for={name}>{lb}</Label>
							<Input
								type="text"
								id={name}
								name={name}
								placeholder={placeholder}
								value={value}
								onChange={handleChange}
							/>
						</FormGroup>
					);
				})}
				{checkboxArr && (
					<CustomCheckbox
						checkboxArr={checkboxArr}
						setCheckedLocations={setCheckboxValue}
					/>
				)}
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={handleSave}>
					Save
				</Button>
				<Button color="secondary" onClick={closeEmployeeEditModal}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default EditEmployee;
