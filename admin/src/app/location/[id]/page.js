"use client";

import React, { useContext, useEffect } from "react";
import { LocationContext } from "@/app/context/LocationContext";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import styles from "./location.module.css";

export default function location({ params: { id } }) {
	const { selectedLocation, getLocationById } = useContext(LocationContext);

	const router = useRouter();

	useEffect(() => {
		getLocationById(id);
	}, [id]);

	return (
		<>
			{selectedLocation && (
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h1>{selectedLocation.Name}</h1>
					</div>
					<div className={styles.cardContent}>
						<p>{selectedLocation.Phone}</p>
						<p>
							{selectedLocation.Address} {selectedLocation.City},{" "}
							{selectedLocation.State} {selectedLocation.Zip}
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
