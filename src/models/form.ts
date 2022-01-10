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
