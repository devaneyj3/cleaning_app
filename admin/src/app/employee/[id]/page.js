"use client";

import React, { useContext, useEffect } from "react";
import { MyContext } from "@/app/context";
import styles from "./employee.module.css";

export default function employee({ params: { id } }) {
	const { selectedEmployee, getEmployeeById } = useContext(MyContext);
	useEffect(() => {
		getEmployeeById(id);
	}, [id]);

	return (
		<>
			{selectedEmployee && (
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h1>{selectedEmployee.name}</h1>
					</div>
					<div className={styles.cardContent}>
						<p> {selectedEmployee.phone}</p>
						<p> {selectedEmployee.email}</p>
						<p>{selectedEmployee.hourly_pay}</p>
						<p>{selectedEmployee.position}</p>
					</div>
				</div>
			)}
		</>
	);
}
