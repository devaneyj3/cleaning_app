module.exports = {
	development: {
		client: "pg",
		debug: true,
		connection: {
			host: process.env.HOST,
			port: process.env.DB_PORT,
			database: "cleaning",
			user: process.env.USER,
			password: process.env.PASSWORD,
		},
		migrations: {
			directory: "./data/migrations",
		},
		ssl: true,
		useNullAsDefault: true,
	},
	testing: {
		client: "pg",
		debug: true,
		connection: {
			host: process.env.HOST,
			port: process.env.DB_PORT,
			database: "cleaning",
			user: process.env.USER,
			password: process.env.PASSWORD,
		},
		migrations: {
			directory: "./data/migrations",
		},
		ssl: true,
		useNullAsDefault: true,
	},

	production: {
		client: "postgresql",
		debug: true,
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: "./data/migrations",
		},
		ssl: {
			rejectUnauthorized: false,
		},
	},
};
