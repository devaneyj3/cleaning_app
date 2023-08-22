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
			database: "cleaning_testing",
			user: process.env.USER,
			password: process.env.PASSWORD,
		},
		log: {
			warn(message) {
				// Suppress warning logs
			},
			error(message) {
				// Suppress error logs
			},
			debug(message) {
				// Suppress debug logs
			},
			deprecate(message) {
				// Suppress deprecation logs
			},
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
