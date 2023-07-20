import React from "react";
import styles from "./table.module.css";

const DataTable = () => {
	const data = [
		{
			name: "John Smith",
			email: "john.smith@gmail.com",
			phone: "810-220-8888",
			houly_pay: 17.5,
			position: "Janitor",
		},
		{
			name: "John Doe",
			email: "john.doe@gmail.com",
			phone: "810-220-8878",
			houly_pay: 17.5,
			position: "Janitor",
		},
		{
			name: "John Love",
			email: "john.love@gmail.com",
			phone: "810-220-8898",
			houly_pay: 17.5,
			position: "Janitor Supervisor",
		},
	];

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Hourly Pay</th>
					<th>Postion</th>
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => (
					<tr key={index}>
						<td>{row.name}</td>
						<td>{row.email}</td>
						<td>{row.phone}</td>
						<td>{row.houly_pay}</td>
						<td>{row.position}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default DataTable;
