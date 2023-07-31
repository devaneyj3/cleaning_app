"use client";

import React from "react";

export default function employee({ params }) {
	console.log(params);
	return (
		<main>
			<h1> Information for {params.id}</h1>
		</main>
	);
}
