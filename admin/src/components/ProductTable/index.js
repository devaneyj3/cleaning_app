"use client";

import React, { useEffect, useContext, useState } from "react";
import DataTable from "@/components/table";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/Modal/Modal";
import { ProductContext } from "@/app/context/ProductContext";

export default function ProductTable() {
	const {
		products,
		getProducts,
		saveProduct,
		loading,
		deleteProduct,
		msg,
		toggle,
		modal,
		editProduct,
	} = useContext(ProductContext);

	useEffect(() => {
		getProducts();
	}, []);

	if (loading) {
		return <p>Loading Products...</p>;
	}
	const productFields = [
		{ name: "name", label: "Name", type: "text", required: true },
		{ name: "quantity", label: "Quantity", type: "number", required: true },
		{ name: "use", label: "Use", type: "text", required: true },
		{ name: "status", label: "Status", type: "text", required: true },
		{ name: "type", label: "Type", type: "text", required: true },
	];

	const productLabelsArray = productFields.map((field) => field.label);

	return (
		<main>
			<p>You have {products.length} products</p>
			{products.length > 0 ? (
				<>
					<DataTable
						rows={products}
						headers={productLabelsArray}
						api="products"
						deleteEntry={deleteProduct}
					/>
				</>
			) : (
				<p>Create your first product to get started</p>
			)}
			<CustomButton text="Create Product" onClick={toggle} />
			<CustomModal
				isOpen={modal}
				toggle={toggle}
				title="Create Product"
				msg={msg}
				fields={productFields}
				onSave={saveProduct}
			/>
		</main>
	);
}
