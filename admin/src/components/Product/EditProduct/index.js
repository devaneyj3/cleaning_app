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

function EditProduct({
	selectedProductRowToEdit,
	isProductEditModalOpen,
	closeProductEditModal,
}) {
	const [editedData, setEditedData] = useState({});
	const [checkboxValue, setCheckboxValue] = useState([]);
	const handleSave = () => {
		editProduct(selectedProductRowToEdit, editedData, checkboxValue);
		setEditedData({});
		setCheckboxValue([]);
		closeProductEditModal();
	};
	const { locations } = useContext(LocationContext);
	const { editProduct, productLabelArr } = useContext(ProductContext);

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
		<Modal isOpen={isProductEditModalOpen} toggle={closeProductEditModal}>
			<ModalHeader toggle={closeProductEditModal}>Edit Product</ModalHeader>
			<ModalBody>
				{productLabelArr.map((lb, index) => {
					const values = Object.values(selectedProductRowToEdit);
					const keys = Object.keys(selectedProductRowToEdit);
					const placeholder = values[index + 1];
					const value = editedData[keys[index + 1]] || "";
					const name = lb.toLowerCase();
					return (
						<FormGroup key={lb}>
							<Label for={lb}>{lb}</Label>
							<Input
								type="text"
								id={lb}
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
				<Button color="secondary" onClick={closeProductEditModal}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default EditProduct;
