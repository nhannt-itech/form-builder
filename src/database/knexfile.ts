const knexfile = {
	development: {
		client: "postgresql",
		connection: {
			database: "form_builder_db",
			user: "postgres",
			password: "Admin123@",
			// password: "1qaz!QAZ",
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
