import customAxios from "@/utils/CustomAxios";
import React, { useState, useContext } from "react";
import { MyContext } from "@/app/context";
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

function CustomModal({ isOpen, toggle, title }) {
	const [alert, setAlert] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		username: "",
		password: "",
		hourly_pay: "",
		position: "",
	});
	const [invalidFields, setInvalidFields] = useState([]);

	const { employees, setEmployees } = useContext(MyContext);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const save = async () => {
		const requiredFields = [
			"name",
			"username",
			"password",
			"email",
			"phone",
			"hourly_pay",
			"position",
		];
		const emptyFields = requiredFields.filter((field) => !formData[field]);
		if (emptyFields.length > 0) {
			setInvalidFields(emptyFields);
			return;
		} else {
			try {
				const response = await customAxios().post("/employees", formData);
				// Assuming the response contains the success message from the server.
				setAlert(`${response.data.message}`);
				setEmployees([...employees, response.data.employee]);
				setTimeout(() => {
					setAlert("");
					toggle();
				}, 1000);
				// Reset the form fields to their initial empty state.
				setFormData({
					name: "",
					email: "",
					phone: "",
					username: "",
					password: "",
					hourly_pay: "",
					position: "",
				});
			} catch (error) {
				console.error("Error posting data:", error);
				// Handle any errors that may occur during the API request.
				// For example, you can set an error state to display an error message.
				// setError("An error occurred while saving the data. Please try again.");
			}
		}
	};

	const isInvalidField = (fieldName) => invalidFields.includes(fieldName);

	return (
		<div>
			<Modal isOpen={isOpen} toggle={toggle}>
				{alert && <Alert color="success">{alert}</Alert>}
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="name">Name</Label>
							<Input
								id="name"
								name="name"
								type="text"
								value={formData.name}
								onChange={handleChange}
								className={isInvalidField("name") ? "invalid" : ""}
							/>
							{isInvalidField("name") && (
								<FormText className="invalid-text">
									Please fill out this field.
								</FormText>
							)}
						</FormGroup>
						<FormGroup>
							<Label for="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								className={isInvalidField("email") ? "invalid" : ""}
							/>
							{isInvalidField("email") && (
								<FormText className="invalid-text">
									Please fill out this field.
								</FormText>
							)}
						</FormGroup>
						<FormGroup>
							<Label for="username">Username</Label>
							<Input
								id="username"
								name="username"
								type="username"
								value={formData.username}
								onChange={handleChange}
								className={isInvalidField("username") ? "invalid" : ""}
							/>
							{isInvalidField("username") && (
								<FormText className="invalid-text">
									Please fill out this field.
								</FormText>
							)}
						</FormGroup>
						<FormGroup>
							<Label for="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								value={formData.password}
								onChange={handleChange}
								className={isInvalidField("password") ? "invalid" : ""}
							/>
							{isInvalidField("password") && (
								<FormText className="invalid-text">
									Please fill out this field.
								</FormText>
							)}
						</FormGroup>
						<FormGroup>
							<Label for="phone">Phone</Label>
							<Input
								id="phone"
								name="phone"
								type="tel"
								value={formData.phone}
								onChange={handleChange}
								className={isInvalidField("phone") ? "invalid" : ""}
							/>
							{isInvalidField("phone") && (
								<FormText className="invalid-text">
									Please fill out this field.
								</FormText>
							)}
						</FormGroup>
						<FormGroup>
							<Label for="hourly_pay">Pay</Label>
							<Input
								id="hourly_pay"
								name="hourly_pay"
								type="number"
								value={formData.hourly_pay}
								onChange={handleChange}
								className={isInvalidField("hourly_pay") ? "invalid" : ""}
							/>
							{isInvalidField("hourly_pay") && (
								<FormText className="invalid-text">
									Please fill out this field.
								</FormText>
							)}
						</FormGroup>
						<FormGroup>
							<Label for="position">Position</Label>
							<Input
								id="position"
								name="position"
								type="text"
								value={formData.position}
								onChange={handleChange}
								className={isInvalidField("position") ? "invalid" : ""}
							/>
							{isInvalidField("position") && (
								<FormText className="invalid-text">
									Please fill out this field.
								</FormText>
							)}
						</FormGroup>
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
