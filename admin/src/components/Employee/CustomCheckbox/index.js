import { FormGroup, Input, Label } from "reactstrap";
import React from "react";

import styles from "./checkbox.module.css";

function CustomCheckbox({ checkboxArr = {}, setCheckedLocations = {} }) {
	const handleChange = (e, location) => {
		const { name, checked } = e.target;
		if (checked) {
			setCheckedLocations((prevChecked) => [...prevChecked, location]);
		} else {
			setCheckedLocations((prevChecked) =>
				prevChecked.filter(
					(checkedLocation) => checkedLocation.id !== location.id
				)
			);
		}
	};

	return (
		<div>
			{checkboxArr &&
				checkboxArr.map((location) => {
					return (
						<div key={location.id}>
							<FormGroup className={styles.checkbox_group}>
								<div className={styles.list}>
									<Label className={styles.checkbox_label} for={location.label}>
										{location.label}
									</Label>
									<Input
										id={location.label}
										name={location.id}
										type="checkbox"
										onChange={(e) => handleChange(e, location)}
									/>
								</div>
							</FormGroup>
						</div>
					);
				})}
		</div>
	);
}

export default CustomCheckbox;
