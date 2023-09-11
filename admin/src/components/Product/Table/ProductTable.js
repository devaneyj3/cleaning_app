import React, { useContext, useState } from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";

import { ProductContext } from "@/app/context/ProductContext";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import EditProduct from "../EditProduct";

function ProductsTable({ products }) {
	//#region STATE
	const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
	//#endregion

	//#region CONTEXT
	const { productFields, deleteProduct, editProduct, msg, toggle, modal } =
		useContext(ProductContext);

	//#endregion

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
			<td>
				<MdDeleteForever
					color="red"
					onClick={(event) => deleteRow(event, product.id)}
				/>
				<MdEdit color="blue" onClick={(event) => editRow(event, product)} />
			</td>
		</tr>
	));

	//#endregion

	//#region DELETE ROW
	const deleteRow = (e, id) => {
		e.stopPropagation();
		deleteProduct(id);
	};
	//#endregion

	//#region EDIT ROW
	const editRow = (e, product) => {
		e.stopPropagation();
		editProduct(product);
		setSelectedRowToEdit(product);
	};
	//#endregion

	return (
		<>
			<table className={styles.table}>
				<thead>
					<tr>{tableHeaders}</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</table>
			{selectedRowToEdit && <EditProduct row={selectedRowToEdit} />}
		</>
	);
}

export default ProductsTable;
