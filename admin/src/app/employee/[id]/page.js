"use client";

import React, { useContext, useState } from "react";
import { MyContext } from "@/app/context";

export default function employee({ params }) {
	const { selectedEmployee } = useContext(MyContext);
	const { name, phone, email, hourly_pay, position } = selectedEmployee;
	return (
		<main>
			<h1> Information for {name}</h1>
			<h1> {phone}</h1>
			<h1> {email}</h1>
			<h1>{hourly_pay}</h1>
			<h1>{position}</h1>
		</main>
	);
}
