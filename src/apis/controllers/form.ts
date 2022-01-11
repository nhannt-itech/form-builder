import { Request, Response, NextFunction } from "express";
import { FormListRequest, FormRequest } from "../../models";
import { FormService } from "../services";
import { Validator } from "../../utils";
import { error } from "../../utils/responseApi";
class formController {
	async save(req: Request, res: Response, next: NextFunction) {
		try {
			let formRequest = new FormRequest();
			Object.assign(formRequest, req.body);
			const errors = await Validator(formRequest);
			if (errors.length) {
				res.status(400).json(error("Validations errors", errors));
			} else {
				const formId = await FormService.save(formRequest);
				res.status(200).json({ formId });
			}
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
