"use client";

import React, { useContext, useEffect } from "react";
import { EmployeeContext } from "@/app/context/EmployeeContext";
import { useRouter } from "next/navigation";
import styles from "./employee.module.css";
import CustomButton from "@/components/CustomButton/CustomButton";
import { MdAddModerator } from "react-icons/md";

export default function employee({ params: { id } }) {
	const { selectedEmployee, getEmployeeById, employeeLocation } =
		useContext(EmployeeContext);

	const router = useRouter();

	useEffect(() => {
		getEmployeeById(id);
	}, [id]);
	return (
		<>
			{selectedEmployee && (
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h1>{selectedEmployee.Name}</h1>
					</div>
					<div className={styles.cardContent}>
						<p>
							Phone: <span>{selectedEmployee.Phone}</span>
						</p>

						<p>
							Email: <span>{selectedEmployee.Email}</span>
						</p>
						<p>
							Phone: <span>{selectedEmployee.Pay}</span>
						</p>
						<p>
							Position: <span>{selectedEmployee.Position}</span>
						</p>
						{selectedEmployee.Hired && (
							<p>
								Hired:{" "}
								<span>
									{new Date(selectedEmployee.Hired).toLocaleDateString(
										undefined,
										{ year: "numeric", month: "long", day: "numeric" }
									)}
								</span>
							</p>
						)}
						<p>
							Assigned Locations:{" "}
							<span>
								{employeeLocation &&
									employeeLocation.map((loc) => {
										const { id, Name, Address, City, State, Phone } = loc;
										console.log(loc);
										return (
											<div key={id}>
												<p>
													{Name} - {City},{State}
												</p>
												<p>
													{Address}, {Phone}
												</p>
											</div>
										);
									})}
							</span>
						</p>
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
