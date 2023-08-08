import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import { EmployeeContextProvider } from "./context/EmployeeContext";
import { LocationContextProvider } from "./context/LocationContext";
export const metadata = {
	title: "CleanSweeps",
	description:
		"Add your customers, employees, and manage your cleaning buisness",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<EmployeeContextProvider>
					<LocationContextProvider>{children}</LocationContextProvider>
				</EmployeeContextProvider>
			</body>
		</html>
	);
}
