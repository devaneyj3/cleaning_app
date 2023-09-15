import { FormGroup, Input, Label } from "reactstrap";
import React from "react";

import styles from "./checkbox.module.css";

function CustomCheckbox({
	checkboxArr = {},
	setCheckedLocations = {},
	checkboxValue,
}) {
	const handleChange = (e) => {
		const { name, checked } = e.target;
		setCheckedLocations((prevChecked) => {
			const locationId = parseInt(name);
			if (prevChecked.includes(locationId)) {
				// Location ID is already in the list, so remove it (toggle off)
				return prevChecked.filter((id) => id !== locationId);
			} else {
				// Location ID is not in the list, so add it (toggle on)
				return [...prevChecked, locationId];
			}
		});
	};

	console.log("checkbox value", checkboxValue);
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
										checked={
											checkboxValue
												? checkboxValue.includes(location.id)
												: location.checked
										}
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
