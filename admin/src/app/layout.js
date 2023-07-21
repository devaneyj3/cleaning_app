import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = {
	title: "CleanSweeps",
	description:
		"Add your customers, employees, and manage your cleaning buisness",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
