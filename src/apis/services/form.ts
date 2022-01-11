import db from "../../database/db";
import { v4 as uuidv4 } from "uuid";
import { Form, FormListRequest, FormListResponse, FormObject, FormRequest } from "../../models";

class formService {
	async save(formRequest: FormRequest): Promise<String> {
		const { name, description, formElements } = formRequest;
		const formId = uuidv4();
		await db("Forms").insert({ formId, name, description }).returning<String>("formId");
		await db("FormVersions").insert({
			formVersionId: uuidv4(),
			formId,
			versionNo: "1",
			formElements,
		});
		return formId;
	}

	async list(formListRequest: FormListRequest): Promise<FormListResponse> {
		const { search, status, page, pageSize } = formListRequest;
		const offset = (page - 1) * pageSize;
		const { totalPage } = (await db("Forms")
			.count("name", "like", search + "% as totalPage")
			.whereIn("status", status)
			.first()) as any;

		const nextPage = page * pageSize < totalPage;
		const forms = await db("Forms")
			.select<Array<FormObject>>("name", "status", "description", "updatedAt")
			.where("name", "like", search + "%")
			.whereIn("status", status)
			.join(
				db("FormVersions")
					.select("formId")
					.max({ updatedAt: "createdAt" })
					.groupBy("formId")
					.as("FormVersions"),
				"FormVersions.formId",
				"Forms.formId"
			)
			.limit(pageSize)
			.offset(offset);

		return {
			forms,
			nextPage,
		};
	}
}

export const FormService = new formService();
