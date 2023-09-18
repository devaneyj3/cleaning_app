import React, { useState, useContext, useEffect } from "react";
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
import customAxios from "@/utils/CustomAxios";

import moment from "moment";

function EditEmployee({
	selectedEmployeeRowToEdit,
	isEmployeeEditModalOpen,
	closeEmployeeEditModal,
}) {
	const [editedData, setEditedData] = useState({});
	const [checkboxValue, setCheckboxValue] = useState([]);

	const { locations, editLocation } = useContext(LocationContext);
	const {
		editEmployee,
		employeeLabelArr,
		SaveLocationToEmployee,
		employeeLocation,
		getEmployeesLocations,
	} = useContext(EmployeeContext);

	useEffect(() => {
		getEmployeesLocations(selectedEmployeeRowToEdit.id);
	}, []);

	// Add checkboxes for locations dynamically
	// filter out if employees need for the location is less than 1
	// if employee is assigned to the location filter that out too

	const checkboxArr = Object.values(locations)
		.filter((location) => location.employees_needed > 0)
		.map((locationName) => ({
			...locationName,
			name: `${locationName.name}`,
			label: `${locationName.name} - ${locationName.city}`,
			type: "checkbox",
			required: false,
		}));

	const handleSave = () => {
		editEmployee(selectedEmployeeRowToEdit.id, editedData, checkboxValue);
		//TODO: decrement or increase checked locations employees_needed by 1
		for (let value of checkboxValue) {
			SaveLocationToEmployee(selectedEmployeeRowToEdit.id, value.id);
			updateEmployeesNeeded(value.id);
		}
		setEditedData({});
		setCheckboxValue([]);
		closeEmployeeEditModal();
	};

	const updateEmployeesNeeded = async (locationId) => {
		try {
			// Fetch the location by ID
			const response = await customAxios().get(`/locations/${locationId}`);
			const { location } = response.data;

			// Update employees_needed by incrementing it by one
			const updatedLocation = {
				employees_needed: location.employees_needed - 1,
			};

			// Save the updated location
			editLocation(locationId, updatedLocation);
		} catch (error) {
			console.error("Error updating employees_needed:", error.message);
		}
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
