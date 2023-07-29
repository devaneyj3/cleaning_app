import React from "react";
import styles from "./table.module.css";

const DataTable = ({ data }) => {
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
