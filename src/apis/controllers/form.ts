import { Request, Response, NextFunction } from "express";
import { FormListRequest, FormRequest } from "../../models";
import { Validator } from "../../utils";
import FormService from "../services/form";

const formService = new FormService();
export default class FormController {
	async save(req: Request, res: Response, next: NextFunction) {
		try {
			let formRequest = new FormRequest();
			Object.assign(formRequest, req.body);
			await Validator(formRequest, res);

			const formId = await formService.save(formRequest);
			res.status(200).json({ formId });
		} catch (err) {
			next(err);
		}
	}
	async list(req: Request, res: Response, next: NextFunction) {
		try {
			let formListRequest = new FormListRequest();
			Object.assign(formListRequest, req.body);
			let result = await formService.list(formListRequest);
			res.status(200).json({ ...result });
		} catch (err) {
			next(err);
		}
	}
}
