import db from "../../database/db";
import { v4 as uuidv4 } from "uuid";
import { FormListRequest, FormListResponse, FormObject, FormRequest } from "../../models";

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

	async list(formListRequest: FormListRequest): Promise<FormListResponse> {
		const { search, status, page, pageSize } = formListRequest;
		const offset = (page - 1) * pageSize;

		const { totalPage } = (await db("Forms")
			.where("name", "like", search + "%")
			.count("name", "like", search + "%", "as totalPage")
			.whereIn("status", status)
			.first()) as any;

		const nextPage = page * pageSize < totalPage;

		const lastFormVersions = db("FormVersions")
			.select("formId")
			.max({ updatedAt: "createdAt" })
			.groupBy("formId")
			.as("FormVersions");

		const forms = await db("Forms")
			.select<Array<FormObject>>("name", "status", "description", "updatedAt")
			.where("name", "like", search + "%")
			.whereIn("status", status)
			.join(lastFormVersions, "FormVersions.formId", "Forms.formId")
			.limit(pageSize)
			.offset(offset);

		return { forms, nextPage };
	}
}
