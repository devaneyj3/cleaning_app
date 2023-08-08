"use client";

import React, { useContext, useEffect } from "react";
import { EmployeeContext } from "@/app/context/EmployeeContext";
import Link from "next/link";
import styles from "./employee.module.css";

export default function employee({ params: { id } }) {
	const { selectedEmployee, getEmployeeById } = useContext(EmployeeContext);

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
						{selectedEmployee.dateHired && (
							<p>
								{new Date(selectedEmployee.dateHired).toLocaleDateString(
									undefined,
									{ year: "numeric", month: "long", day: "numeric" }
								)}
							</p>
						)}
					</div>
				</div>
			)}
			<Link href="/dashboard">Dashboard</Link>
		</>
	);
}
