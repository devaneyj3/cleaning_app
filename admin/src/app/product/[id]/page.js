"use client";

import React, { useContext, useEffect } from "react";
import { ProductContext } from "@/app/context/ProductContext";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import styles from "./product.module.css";

export default function ProductPage({ params: { id } }) {
	const { selectedProduct, getProductById } = useContext(ProductContext);

	const router = useRouter();

	useEffect(() => {
		getProductById(id);
	}, [id]);

	return (
		<>
			{selectedProduct && (
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h1>
							{selectedProduct.name}-{selectedProduct.id}
						</h1>
					</div>
					<div className={styles.cardContent}>
						<section className={styles.info}>
							<h6>Quantity</h6>
							<p>{selectedProduct.quantity}</p>
						</section>
						<section className={styles.info}>
							<h6>Status</h6>
							<p>{selectedProduct.status}</p>
						</section>
						<section className={styles.info}>
							<h6>Type</h6>
							<p>{selectedProduct.type}</p>
						</section>
						<section className={styles.info}>
							<h6>Use</h6>
							<p>{selectedProduct.use}</p>
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
