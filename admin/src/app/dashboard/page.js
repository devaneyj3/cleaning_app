import DataTable from "@/components/table";
import Link from "next/link";

export default function Dashboard() {
	return (
		<main>
			<h1>Welcome to your dashboard</h1>
			<p>You can create your employees, locations, and products</p>
			<DataTable />
			<Link href="/dashboard">Dashboard</Link>
		</main>
	);
}
