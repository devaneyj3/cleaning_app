"use client";

import React, { createContext, useState } from "react";
import customAxios from "@/utils/CustomAxios";

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const getProducts = async () => {
		try {
			const response = await customAxios().get("/products");
			const productsData = response.data;
			// Do something with the products' data here.
			setProducts(productsData.product);
			setLoading(false);
		} catch (error) {
			// Handle any errors that might occur during the API request.
			console.error("Error fetching products:", error.message);
		}
	};

	const getProductById = async (id) => {
		try {
			const response = await customAxios().get(`/products/${id}`);
			const { data } = response;
			setSelectedProduct(data.product);
		} catch (error) {
			console.error("Error fetching product:", error.message);
		}
	};

	const deleteProduct = async (id) => {
		try {
			console.log("deleting product");
			const response = await customAxios().delete(`/products/${id}/delete`);
			const deletedID = response.data.id;
			setProducts(products.filter((product) => product.id != deletedID));
		} catch (error) {
			console.error("Error deleting product:", error.message);
		}
	};

	const editProduct = async (id, data) => {
		try {
			const response = await customAxios().put(`/products/${id}/edit`, data);
			const updatedProducts = response.data.products;
			setProducts(updatedProducts);
		} catch (error) {
			console.error("Error editing product:", error.message);
		}
	};

	return (
		<ProductContext.Provider
			value={{
				products,
				getProducts,
				setProducts,
				loading,
				deleteProduct,
				editProduct,
				selectedProduct,
				getProductById,
			}}>
			{children}
		</ProductContext.Provider>
	);
};

export { ProductContext, ProductContextProvider };
