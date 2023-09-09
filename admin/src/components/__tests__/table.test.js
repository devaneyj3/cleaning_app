import React from "react";
import { render, screen } from "@testing-library/react";
import DataTable from "../index";
import { MyContext } from "../../app/context/EmployeeContext";

describe("DataTable", () => {
	it("renders correctly", () => {
		const data = [
			{
				id: "randomUuid1",
				name: "John Doe",
				email: "john@example.com",
				phone: "123-456-7890",
				hourly_pay: 20,
				position: "Developer",
			},
		];

		const deleteEmployee = jest.fn();

		render(
			<MyContext.Provider value={{ deleteEmployee }}>
				<DataTable data={data} />
			</MyContext.Provider>
		);

		expect(screen.getByText(/John Doe/)).toBeInTheDocument();
		expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
		expect(screen.getByText(/123-456-7890/)).toBeInTheDocument();
		expect(screen.getByText(/\$20\/hr/)).toBeInTheDocument();
		expect(screen.getByText(/Developer/)).toBeInTheDocument();
	});
});
