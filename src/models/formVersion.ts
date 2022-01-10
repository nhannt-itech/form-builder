import { IsNotEmpty } from "class-validator";

export class Form {
	@IsNotEmpty()
	formVersionId: string;

	@IsNotEmpty()
	formId: string;

	@IsNotEmpty()
	versionNo: string;

	@IsNotEmpty()
	formElements: string;

	@IsNotEmpty()
	createdAt: Date;
}
