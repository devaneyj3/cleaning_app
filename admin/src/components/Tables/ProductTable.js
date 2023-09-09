import React, { useContext } from "react";
import styles from "./table.module.css";
import CustomCheckbox from "../CustomCheckbox";
import { useRouter } from "next/navigation";

import { ProductContext } from "@/app/context/ProductContext";

function ProductsTable({ products }) {
	const { productFields } = useContext(ProductContext);

	const router = useRouter();

	//#region NAVIGATE TO PRODUCT PAGE

	const handleRowClick = (id) => {
		router.push(`product/${id}`);
	};

	//#endregion

	//#region TABLE HEADERS
	// Generate table headers from the locationFields array
	const tableHeaders = productFields.map((field) => (
		<th key={field.name}>{field.label}</th>
	));

	//#endregion

	//#region TABLE ROWS
	// Generate table rows from the employee data
	const tableRows = products.map((product, index) => (
		<tr key={index} onClick={() => handleRowClick(product.id)}>
			{productFields.map((field) => (
				<td key={field.name}>{product[field.name]}</td>
			))}
		</tr>
	));

	//#endregion

	return (
		<table className={styles.table}>
			<thead>
				<tr>{tableHeaders}</tr>
			</thead>
			<tbody>{tableRows}</tbody>
		</table>
	);
}

export default ProductsTable;
