import axios from "axios";

const customAxios = () => {
	let environment =
		process.env.NODE_ENV === "production"
			? "https://sample12342.herokuapp.com/api/"
			: "http://localhost:3001/api/";

	return axios.create({
		baseURL: environment,
	});
};

export default customAxios;
