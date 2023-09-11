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
import CustomCheckbox from "../CustomCheckbox";
import { LocationContext } from "@/app/context/LocationContext";
import { ProductContext } from "@/app/context/ProductContext";

function EditProduct({ row }) {
	const [editedData, setEditedData] = useState({});
	const [checkboxValue, setCheckboxValue] = useState([]);
	const handleSave = () => {
		editProduct(editedData, checkboxValue);
		setEditedData({});
		setCheckboxValue([]);
		toggle();
	};
	const { locations } = useContext(LocationContext);
	const { toggle, modal, editProduct, productFields } =
		useContext(ProductContext);

	// Add checkboxes for locations dynamically
	const checkboxArr = Object.values(locations).map((locationName) => ({
		...locationName,
		name: `${locationName.name}`,
		label: `${locationName.name} - ${locationName.city}`,
		type: "checkbox",
		required: false,
	}));

	const handleChange = (e) => {
		const { value, name } = e.target;
		setEditedData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>Edit Product</ModalHeader>
			<ModalBody>
				{productFields.map((lb, index) => {
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

export default EditProduct;
