import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("FormVersions", (table: Knex.TableBuilder) => {
		table.uuid("formVersionId").primary();
		table.uuid("formId").notNullable();
		table.string("versionNo").notNullable();
		table.jsonb("formElements").notNullable();
		table.date("createdAt").defaultTo(knex.fn.now());

		table.foreign("formId").references("formId").inTable("Forms");
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("FormVersions");
}
