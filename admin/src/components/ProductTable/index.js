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
	const {
		products,
		getProducts,
		setProducts,
		loading,
		deleteProduct,
		editProduct,
	} = useContext(ProductContext);

	useEffect(() => {
		getProducts();
	}, []);

	const toggle = () => setModal(!modal);

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

	productLabelsArray.unshift("Id");

	const saveProduct = async (formData) => {
		try {
			const response = await customAxios().post("/products", formData);
			setMsg("Successfully added product");
			setProducts(response.data.products);
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
