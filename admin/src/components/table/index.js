import React, { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import styles from "./table.module.css";

import { useRouter } from "next/navigation";

const DataTable = ({ rows, headers }) => {
	const router = useRouter();

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
						<tr key={index}>
							{values.map((row, index) => {
								return (
									<>
										<td key={index}>{row}</td>
									</>
								);
							})}
							<td>
								<MdDeleteForever color="red" />
								<MdEdit color="blue" />
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default DataTable;
