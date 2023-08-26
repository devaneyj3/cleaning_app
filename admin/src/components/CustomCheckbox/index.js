import { FormGroup, Input, Label } from "reactstrap";
import React from "react";

import styles from "./checkbox.module.css";

function CustomCheckbox({ checkboxArr, setCheckedLocations }) {
	const handleChange = (e) => {
		const { name, checked } = e.target;
		if (checked) {
			setCheckedLocations((prevChecked) => [...prevChecked, name]);
		} else {
			setCheckedLocations((prevChecked) =>
				prevChecked.filter((locationId) => locationId !== name)
			);
		}
	};

	return (
		<div>
			{checkboxArr &&
				checkboxArr.map((location) => {
					return (
						<>
							<FormGroup key={location.id} className={styles.checkbox_group}>
								<div className={styles.list}>
									<Label className={styles.checkbox_label} for={location.id}>
										{location.label}
									</Label>
									<Input
										id={location.id}
										name={location.id}
										type="checkbox"
										onChange={handleChange}
									/>
								</div>
							</FormGroup>
						</>
					);
				})}
		</div>
	);
}

export default CustomCheckbox;
