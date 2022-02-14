import db from "../../database/db";
import { v4 as uuidv4 } from "uuid";
import { FormListRequest, FormListResponse, FormObject, FormRequest } from "../../models";
import { CompareObjects, isParentArray } from "../../utils";
import { Status } from "../../constants";

export default class FormService {
	async save(formRequest: FormRequest): Promise<String> {
		const { name, description, formElements } = formRequest;
		const formId = uuidv4();

		return await db.transaction(async (trx) => {
			await trx("Forms").insert({ formId, name, description }, "formId");
			await trx("FormVersions").insert({
				formVersionId: uuidv4(),
				formId,
				versionNo: "1",
				formElements,
			});
			return formId;
		});
	}

	async update(formRequest: FormRequest): Promise<boolean> {
		const { formId, name, description, formElements } = formRequest;
		const form = await db("Forms").where("formId", formId).first();

		if (!form) throw new Error("formId is not valid.");

		const { latestVersion } = (await db("FormVersions")
			.select("formId")
			.where("formId", formId)
			.max({ latestVersion: "versionNo" })
			.groupBy("formId")
			.first()) as any;
		const latestFormVersion = await db("FormVersions")
			.where("formId", formId)
			.where("versionNo", latestVersion)
			.first();
		//1 query

		return await db.transaction(async (trx) => {
			await trx("Forms").where("formId", formId).update({ name, description });
			if (!CompareObjects(latestFormVersion.formElements, formElements)) {
				await trx("FormVersions").insert({
					formVersionId: uuidv4(),
					formId,
					versionNo: Number(latestFormVersion.versionNo) + 1,
					formElements,
				});
			}
			return true;
		});
	}

	async list(formListRequest: FormListRequest): Promise<FormListResponse> {
		const { search, status, page, pageSize } = formListRequest;
		const offset = (page - 1) * pageSize;

		const { totalPage } = (await db("Forms")
			.where("name", "like", "%" + search + "%")
			.count("name", "like", "%" + search + "%", "as totalPage")
			.whereIn("status", status)
			.first()) as any;

		const nextPage = page * pageSize < totalPage;

		const latestFormVersions = db
			.from("FormVersions")
			.innerJoin(
				db("FormVersions")
					.select("formId")
					.max({ versionNo: "versionNo" })
					.groupBy("formId")
					.as("b"),
				function () {
					this.on("FormVersions.formId", "b.formId").on("FormVersions.versionNo", "b.versionNo");
				}
			)
			.select("FormVersions.formId", "FormVersions.versionNo", {
				updatedAt: "FormVersions.createdAt",
			})
			.as("FormVersions");

		const forms = await db("Forms")
			.select<Array<FormObject>>("name", "status", "versionNo", "updatedAt")
			.where("name", "like", "%" + search + "%")
			.whereIn("status", status)
			.join(latestFormVersions, "FormVersions.formId", "Forms.formId")
			.limit(pageSize)
			.offset(offset);

		return { forms, nextPage };
	}
	async getAll(status: string[]): Promise<any[]> {
		if (!isParentArray(Status.ALL, status)) throw new Error("status array is not valid");
		const latestFormVersions = db
			.from("FormVersions")
			.innerJoin(
				db("FormVersions")
					.select("formId")
					.max({ versionNo: "versionNo" })
					.groupBy("formId")
					.as("b"),
				function () {
					this.on("FormVersions.formId", "b.formId").on("FormVersions.versionNo", "b.versionNo");
				}
			)
			.select("FormVersions.formId", "FormVersions.versionNo", {
				updatedAt: "FormVersions.createdAt",
			})
			.as("FormVersions");
		const forms = await db("Forms")
			.select("Forms.formId", "name", { desc: "description" }, { latestVersion: "versionNo" })
			.whereIn("Forms.status", status)
			.join(latestFormVersions, "FormVersions.formId", "Forms.formId");

		return forms;
	}

	async active(formId: string): Promise<Boolean> {
		const form = await db("Forms").where("formId", formId).first();

		if (!form) throw new Error("formId is not valid.");

		await db("Forms").where("formId", formId).update({ status: Status.ACTIVE });
		return true;
	}

	async archive(formId: string): Promise<Boolean> {
		const form = await db("Forms").where("formId", formId).first();

		if (!form) throw new Error("formId is not valid.");

		await db("Forms").where("formId", formId).update({ status: Status.ARCHIVED });
		return true;
	}
}
