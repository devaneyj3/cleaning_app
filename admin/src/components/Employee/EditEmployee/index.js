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

function EditEmployee({ selectedRowToEdit }) {
	const [editedData, setEditedData] = useState({});
	const [checkboxValue, setCheckboxValue] = useState([]);

	const { locations } = useContext(LocationContext);
	const { toggle, modal, editEmployee, employees } =
		useContext(EmployeeContext);

	// Add checkboxes for locations dynamically
	const checkboxArr = Object.values(locations).map((locationName) => ({
		...locationName,
		name: `${locationName.name}`,
		label: `${locationName.name} - ${locationName.city}`,
		type: "checkbox",
		required: false,
	}));

	const handleSave = () => {
		editEmployee(selectedRowToEdit, editedData, checkboxValue);
		setEditedData({});
		setCheckboxValue([]);
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
			<ModalHeader toggle={toggle}>Edit Employee</ModalHeader>
			<ModalBody>
				{employees.map((lb, index) => {
					const values = Object.values(lb);
					const keys = Object.keys(lb);
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
				<Button color="secondary" onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default EditEmployee;
