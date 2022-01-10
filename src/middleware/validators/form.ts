import { Request, Response, NextFunction } from "express";
import Validator from "./config";
import { FormRequest } from "../../models";

class formValidator {
	async save(req: Request, res: Response, next: NextFunction) {
		let formRequest = new FormRequest();
		Object.assign(formRequest, req.body);
		await Validator(formRequest, res, next);
	}
}

export const FormValidator = new formValidator();
