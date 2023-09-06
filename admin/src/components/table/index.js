import React, { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import styles from "./table.module.css";

import { useRouter } from "next/navigation";

const DataTable = ({ rows, headers, deleteEntry, editEntry, api }) => {
	const router = useRouter();

	const handleRowClick = (id) => {
		if (api == "employees") router.push(`employee/${id}`);
		if (api == "locations") router.push(`location/${id}`);
		if (api == "products") router.push(`product/${id}`);
	};

	const deleteRow = (e, id) => {
		e.stopPropagation();
		deleteEntry(id);
	};

	const editRow = (e, id) => {
		e.stopPropagation();
		editEntry(id);
	};
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Id</th>
					{headers.map((header, index) => (
						<th key={index}>{header}</th>
					))}
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((row, index) => {
					const values = Object.values(row);
					return (
						<tr key={index} onClick={() => handleRowClick(row.id)}>
							{values.map((row, index) => {
								return <td key={index}>{row}</td>;
							})}
							<td key="actions">
								<MdDeleteForever
									color="red"
									onClick={(event) => deleteRow(event, row.id)}
								/>
								<MdEdit
									color="blue"
									onClick={(event) => editRow(event, row.id)}
								/>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default DataTable;
