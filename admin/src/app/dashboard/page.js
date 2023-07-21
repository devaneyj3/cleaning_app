import DataTable from "@/components/table";
import "./dashboard.css";

export default function Dashboard() {
	return (
		<main>
			<h1>Welcome to your dashboard</h1>
			<p>You can create your employees, locations, and products</p>
			<DataTable />
		</main>
	);
}
