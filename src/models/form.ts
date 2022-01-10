import { IsNotEmpty } from "class-validator";

export class Form {
	@IsNotEmpty()
	formId: string;

	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	status: string;

	description: string;
}
//
export class FormRequest {
	@IsNotEmpty()
	name: string;

	description: string;

	@IsNotEmpty()
	formElements: JSON;
}

//for listing
export class FormListRequest {
	search: string = "";
	status: Array<string> = [];
	page: number = 1;
	pageSize: number = 10;
}

export class FormObject {
	name: string;
	status: string;
	versionNo: string;
	latestUpdateAt: Date;
}

export class FormListResponse {
	forms: Array<FormObject>;
	nextPage: boolean;
}
