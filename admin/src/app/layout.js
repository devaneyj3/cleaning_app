import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import { MyContextProvider } from "./context";
export const metadata = {
	title: "CleanSweeps",
	description:
		"Add your customers, employees, and manage your cleaning buisness",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<MyContextProvider>{children}</MyContextProvider>
			</body>
		</html>
	);
}
