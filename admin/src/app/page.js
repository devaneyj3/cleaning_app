import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>Welcome to CleanSweep</h1>
			<p>Manage your cleaning buisness</p>
			<Link href="/dashboard">Dashboard</Link>
		</main>
	);
}
