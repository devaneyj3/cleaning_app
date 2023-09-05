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
						<h1>
							{selectedLocation.name}-{selectedLocation.id}
						</h1>
					</div>
					<div className={styles.cardContent}>
						<section className={styles.info}>
							<p>{selectedLocation.phone}</p>
							<p>{selectedLocation.address}</p>
							<p>
								{selectedLocation.city}, {selectedLocation.state}{" "}
								{selectedLocation.zip}
							</p>
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
