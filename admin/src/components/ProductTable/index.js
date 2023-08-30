"use client";

import React, { useEffect, useContext, useState } from "react";
import DataTable from "@/components/table";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomModal from "@/components/Modal/Modal";
import customAxios from "@/utils/CustomAxios";
import { ProductContext } from "@/app/context/ProductContext";

export default function ProductTable() {
	const [modal, setModal] = useState(false);
	const [msg, setMsg] = useState("");
	const { products, getProducts, loading, deleteProduct, editProduct } =
		useContext(ProductContext);

	useEffect(() => {
		getProducts();
	}, []);

	const toggle = () => setModal(!modal);

	if (loading) {
		return <p>Loading Products...</p>;
	}

	const productFields = [
		{ name: "Name", label: "Name", type: "text", required: true },
		{ name: "Price", label: "Price", type: "number", required: true },
		{
			name: "Description",
			label: "Description",
			type: "text",
			required: false,
		},
	];

	const productLabelsArray = productFields.map((field) => field.label);

	productLabelsArray.unshift("ID");

	const saveProduct = async (formData) => {
		try {
			const response = await customAxios().post("/products", formData);
			// Assuming the response contains the success message from the server.
			setMsg("Successfully added product");
			setTimeout(() => {
				toggle();
				setMsg("");
			}, 1000);
		} catch (error) {
			console.error("Error posting data:", error);
		}
	};

	return (
		<main>
			<p>You have {products.length} products</p>
			{products.length > 0 ? (
				<>
					<DataTable
						data={products}
						labels={productLabelsArray}
						onEdit={editProduct}
						onDelete={deleteProduct}
						api="products"
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
