import React, { useContext } from "react";
import { MyContext } from "@/app/context";
import styles from "./table.module.css";
import { MdDeleteForever } from "react-icons/md";

const DataTable = ({ data }) => {
	const { deleteEmployee } = useContext(MyContext);
	const deleteRow = (id) => {
		deleteEmployee(id);
	};
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>ID</th>
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
						<td>{row.id}</td>
						<td>{row.name}</td>
						<td>{row.email}</td>
						<td>{row.phone}</td>
						<td>${row.hourly_pay}/hr</td>
						<td>{row.position}</td>
						<td>
							<MdDeleteForever color="red" onClick={() => deleteRow(row.id)} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default DataTable;
