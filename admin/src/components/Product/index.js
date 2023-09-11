"use client";

import React, { useEffect, useContext } from "react";
import CustomButton from "@/components/CustomButton/CustomButton";
import { ProductContext } from "@/app/context/ProductContext";
import { LocationContext } from "../../app/context/LocationContext";
import ProductsTable from "./Table/ProductTable";
import CreatProduct from "./CreateProduct";

export default function Product() {
	const { products, getProducts, loading, toggle } = useContext(ProductContext);

	useEffect(() => {
		getProducts();
	}, []);

	if (loading) {
		return <p>Loading Products...</p>;
	}

	return (
		<main>
			<p>You have {products.length} products</p>
			{products.length > 0 ? (
				<ProductsTable products={products} />
			) : (
				<p>Create your first product to get started</p>
			)}
			<CustomButton text="Create Product" onClick={toggle} />
			<CreatProduct />
		</main>
	);
}
