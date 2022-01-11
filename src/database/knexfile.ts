const knexfile = {
	development: {
		client: "postgresql",
		connection: "postgres://postgres:1qaz!QAZ@postgres:5432/formbuilder-db",
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
