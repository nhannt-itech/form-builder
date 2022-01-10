import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("Forms", (table: Knex.TableBuilder) => {
		table.uuid("formId").primary();
		table.string("name").notNullable().defaultTo("Form title");
		table.string("status").notNullable().defaultTo("Active");
		table.string("description");
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("Forms");
}
