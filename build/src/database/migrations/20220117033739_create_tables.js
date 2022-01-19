"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .createTable("Forms", (table) => {
            table.uuid("formId").primary();
            table.string("name").notNullable().defaultTo("Form title");
            table.string("status").notNullable().defaultTo("Active");
            table.string("description");
        })
            .createTable("FormVersions", (table) => {
            table.uuid("formVersionId").primary();
            table.uuid("formId").notNullable();
            table.string("versionNo").notNullable();
            table.jsonb("formElements").notNullable();
            table.date("createdAt").defaultTo(knex.fn.now());
            table.foreign("formId").references("formId").inTable("Forms");
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("FormVersions").dropTable("Forms");
    });
}
exports.down = down;
