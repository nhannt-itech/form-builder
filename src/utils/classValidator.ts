import { validate } from "class-validator";
import { Response } from "express";
import { error } from "../utils";

export const Validator = async (object: any, res: Response) => {
	const resErrors = await validate(object);
	const errors = resErrors.map((item) => item.constraints);
	if (errors.length) {
		res.status(400).json(error("Validations errors", errors));
	}
};
