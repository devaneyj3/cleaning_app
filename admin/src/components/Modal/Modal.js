import React, { useState } from "react";
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

function CustomModal({ isOpen, toggle, title, msg }) {
	const [alert, setAlert] = useState("");
	const save = () => {
		setAlert(msg);
		setTimeout(() => {
			setAlert("");
			toggle();
		}, 1000);
	};
	return (
		<div>
			<Modal isOpen={isOpen} toggle={toggle}>
				{alert && <Alert color="success">{alert}</Alert>}
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="name">Name</Label>
							<Input id="name" name="name" type="text" />
						</FormGroup>
						<FormGroup>
							<Label for="email">Email</Label>
							<Input id="email" name="email" type="email" />
						</FormGroup>
						<FormGroup>
							<Label for="phone">Phone</Label>
							<Input id="phone" name="phone" type="tel" />
						</FormGroup>
						<FormGroup>
							<Label for="pay">Pay</Label>
							<Input id="pay" name="pay" type="number" />
						</FormGroup>
						<FormGroup>
							<Label for="position">Position</Label>
							<Input id="position" name="position" type="text" />
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
