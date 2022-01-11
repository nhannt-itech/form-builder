const knexfile = {
	development: {
		client: "postgresql",
		connection: process.env.DATABASE_URL || {
			database: "formbuilder-db",
			user: "postgres",
			password: "1qaz!QAZ",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};

export default knexfile;
