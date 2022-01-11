const knexfile = {
	development: {
		client: "postgresql",
		connection: {
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
