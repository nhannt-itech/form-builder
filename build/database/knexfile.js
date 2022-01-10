"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knexfile = {
    development: {
        client: "postgresql",
        connection: {
            database: "formbuilder_db",
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
exports.default = knexfile;
