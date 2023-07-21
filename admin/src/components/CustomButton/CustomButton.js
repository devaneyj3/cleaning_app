"use client";
import styles from "./custom.module.css";

export default function CustomButton({ text, onClick }) {
	return (
		<button className={styles.button} onClick={onClick}>
			{text}
		</button>
	);
}
