"use client";

import React, { useContext, useEffect } from "react";
import { LocationContext } from "@/app/context/LocationContext";
import Link from "next/link";
import styles from "./location.module.css";

export default function location({ params: { id } }) {
	const { selectedLocation, getLocationById } = useContext(LocationContext);

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
						<p> {selectedLocation.Address}</p>
						<p> {selectedLocation.Phone}</p>
						<p>{selectedLocation.City}</p>
						<p>{selectedLocation.State}</p>
						<p>{selectedLocation.Zip}</p>
					</div>
				</div>
			)}
			<Link href="/dashboard">Dashboard</Link>
		</>
	);
}
