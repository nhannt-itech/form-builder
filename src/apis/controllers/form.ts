import { Request, Response, NextFunction } from "express";
import { FormListRequest, FormRequest } from "../../models";
import { FormService } from "../services";

class formController {
	async save(req: Request, res: Response, next: NextFunction) {
		try {
			const formRequest: FormRequest = { ...req.body };
			const formId = await FormService.save(formRequest);
			res.status(200).json({ formId, success: true, message: "Created form successfully!" });
		} catch (err) {
			next(err);
		}
	}
	async list(req: Request, res: Response, next: NextFunction) {
		try {
			let formListRequest = new FormListRequest();
			Object.assign(formListRequest, req.body);
			let result = await FormService.list(formListRequest);
			res.status(200).json({ ...result });
		} catch (err) {
			next(err);
		}
	}
}

export const FormController = new formController();
