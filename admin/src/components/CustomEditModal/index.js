import React, { useState } from "react";
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

function CustomEditModal({
	isOpen,
	toggle,
	title,
	onSave,
	row,
	headers,
	checkboxes,
}) {
	const [editedData, setEditedData] = useState({});
	const [checkboxValue, setCheckboxValue] = useState([]);
	const handleSave = () => {
		onSave(editedData, checkboxValue);
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
		<Modal isOpen={isOpen} toggle={toggle}>
			<ModalHeader toggle={toggle}>{title}</ModalHeader>
			<ModalBody>
				{headers.map((lb, index) => {
					const values = Object.values(row);
					const keys = Object.keys(row);
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
				{checkboxes && (
					<CustomCheckbox
						checkboxArr={checkboxes}
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

export default CustomEditModal;
