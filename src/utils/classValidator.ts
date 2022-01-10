import { validate } from "class-validator";

export const Validator = async (object: any) => {
	const resErrors = await validate(object);
	const errors = resErrors.map((item) => item.constraints);
	return errors;
};
