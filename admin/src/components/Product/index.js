"use client";

import React, { useEffect, useContext } from "react";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/Modal/Modal";
import { ProductContext } from "@/app/context/ProductContext";
import { LocationContext } from "../../app/context/LocationContext";
import ProductsTable from "./Table/ProductTable";

export default function Product() {
	const { products, getProducts, saveProduct, loading, toggle } =
		useContext(ProductContext);
	const { locations } = useContext(LocationContext);

	useEffect(() => {
		getProducts();
	}, []);

	if (loading) {
		return <p>Loading Products...</p>;
	}
	// Add checkboxes for locations dynamically
	const checkboxArr = Object.values(locations).map((locationName) => ({
		...locationName,
		name: `${locationName.name}`,
		label: `${locationName.name} - ${locationName.city}`,
		type: "checkbox",
		required: false,
	}));

	return (
		<main>
			<p>You have {products.length} products</p>
			{products.length > 0 ? (
				<ProductsTable products={products} />
			) : (
				<p>Create your first product to get started</p>
			)}
			<CustomButton text="Create Product" onClick={toggle} />
			{/* <CustomModal
				isOpen={modal}
				toggle={toggle}
				title="Create Product"
				msg={msg}
				modalType="product"
				fields={productFields}
				onSave={saveProduct}
				checkboxArr={checkboxArr} */}
			{/* /> */}
		</main>
	);
}
