import { IsNotEmpty } from "class-validator";

export class FormVersion {
	@IsNotEmpty()
	formVersionId: string;

	@IsNotEmpty()
	formId: string;

	@IsNotEmpty()
	versionNo: string;

	@IsNotEmpty()
	formElements: JSON;

	@IsNotEmpty()
	createdAt: Date;
}
