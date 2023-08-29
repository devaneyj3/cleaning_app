"use client";

import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "@/app/context/EmployeeContext";
import { useRouter } from "next/navigation";
import styles from "./employee.module.css";
import CustomButton from "@/components/CustomButton/CustomButton";
import moment from "moment";
import "moment-precise-range-plugin";

export default function Employee({ params: { id } }) {
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
		var starts = moment(selectedEmployee.Hired);
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
						<h1>{selectedEmployee.Name}</h1>
						<section className={styles.hired_stats}>
							{selectedEmployee.Hired && (
								<p>
									Hired:{" "}
									<p>
										{new Date(selectedEmployee.Hired).toLocaleDateString(
											undefined,
											{ year: "numeric", month: "long", day: "numeric" }
										)}
									</p>
								</p>
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
							<p>{selectedEmployee.Phone}</p>
						</section>
						<section className={styles.info}>
							<h6>Email</h6>
							<p>{selectedEmployee.Email}</p>
						</section>
						<section className={styles.info}>
							<h6>Pay</h6>
							<p>{selectedEmployee.Pay}</p>
						</section>
						<section className={styles.info}>
							<h6>Position</h6>
							<p>{selectedEmployee.Position}</p>
						</section>
						<section className={styles.info}>
							<h6>Locations</h6>
							{employeeLocation &&
								employeeLocation.map((loc) => {
									const { id, Name, Address, City, State, Phone } = loc;
									return (
										<div key={id}>
											<p>
												{Name} - {City},{State} {""} {Address}, {Phone}
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
