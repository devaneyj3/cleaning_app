"use client";

import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "@/app/context/EmployeeContext";
import { useRouter } from "next/navigation";
import styles from "./employee.module.css";
import CustomButton from "@/components/CustomButton/CustomButton";
import moment from "moment";
import "moment-precise-range-plugin";

export default function Employee({ params: { id = {} } }) {
	const { selectedEmployee, getEmployeeById, employeeLocation } =
		useContext(EmployeeContext);

	const router = useRouter();

	useEffect(() => {
		getEmployeeById(id);
	}, [id]);

	const [timeSinceHired, setTimeSinceHired] = useState(null);

	useEffect(() => {
		if (selectedEmployee) {
			calculateTimeSinceHired();
		}
	}, [selectedEmployee]);

	const calculateTimeSinceHired = () => {
		var starts = moment(selectedEmployee.hired);
		var ends = moment();

		var diff = moment.preciseDiff(starts, ends, true);

		let duration = "";
		if (diff.years > 0) {
			duration += `${diff.years} ${diff.years === 1 ? "year" : "years"} `;
		}
		if (diff.months > 0) {
			duration += `${diff.months} ${diff.months === 1 ? "month" : "months"} `;
		}
		if (diff.days > 0) {
			duration += `${diff.days} ${diff.days === 1 ? "day" : "days"} `;
		}

		setTimeSinceHired(duration);
	};

	return (
		<>
			{selectedEmployee && (
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h1>{selectedEmployee.name}</h1>
						<section className={styles.hired_stats}>
							{selectedEmployee.hired && (
								<>
									<p>
										Hired: {moment(selectedEmployee.hired).format("MM/DD/YYYY")}
									</p>
								</>
							)}
							{timeSinceHired && (
								<p>
									Employed for: <span>{timeSinceHired}</span>
								</p>
							)}
						</section>
					</div>
					<div className={styles.cardContent}>
						<section className={styles.info}>
							<h6>Phone</h6>
							<p>{selectedEmployee.phone}</p>
						</section>
						<section className={styles.info}>
							<h6>Email</h6>
							<p>{selectedEmployee.email}</p>
						</section>
						<section className={styles.info}>
							<h6>Pay</h6>
							<p>${selectedEmployee.pay}/hr</p>
						</section>
						<section className={styles.info}>
							<h6>Position</h6>
							<p>{selectedEmployee.position}</p>
						</section>
						<section className={styles.info}>
							{employeeLocation && <h6>Locations</h6>}
							{employeeLocation &&
								employeeLocation.map((loc) => {
									const { id, name, address, city, state, phone } = loc;
									return (
										<div key={id}>
											<p className={styles.banks}>
												{name} - {city},{state} {""} {address}, {phone}
											</p>
										</div>
									);
								})}
						</section>
					</div>
					<CustomButton
						text="Dashboard"
						onClick={() => router.push("/dashboard")}
					/>
				</div>
			)}
		</>
	);
}
