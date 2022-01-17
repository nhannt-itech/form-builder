import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable("Forms", (table: Knex.TableBuilder) => {
			table.uuid("formId").primary();
			table.string("name").notNullable().defaultTo("Form title");
			table.string("status").notNullable().defaultTo("Active");
			table.string("description");
		})
		.createTable("FormVersions", (table: Knex.TableBuilder) => {
			table.uuid("formVersionId").primary();
			table.uuid("formId").notNullable();
			table.string("versionNo").notNullable();
			table.jsonb("formElements").notNullable();
			table.date("createdAt").defaultTo(knex.fn.now());

			table.foreign("formId").references("formId").inTable("Forms");
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("FormVersions").dropTable("Forms");
}
