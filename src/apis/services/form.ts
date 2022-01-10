import db from "../../database/db";
import { v4 as uuidv4 } from "uuid";
import {
	Form,
	FormListRequest,
	FormListResponse,
	FormObject,
	FormRequest,
} from "../../models/form";

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
		const { count } = (await db("Forms")
			.count("name", "like", search + "%")
			.whereIn("status", status)
			.first()) as any;

		const latestFormVersions = db("FormVersions")
			.select("formId")
			.max({ updatedAt: "createdAt" })
			.groupBy("formId")
			.as("FormVersions");

		const forms = await db("Forms")
			.select<Array<FormObject>>("*")
			.where("name", "like", search + "%")
			.whereIn("status", status)
			.join(latestFormVersions, "FormVersions.formId", "Forms.formId")
			.limit(pageSize)
			.offset((page - 1) * pageSize);

		const nextPage = page * pageSize < count;
		return {
			forms,
			nextPage,
		};
	}
}

export const FormService = new formService();
