import { Request, Response, NextFunction } from "express";
import { Status } from "../../constants";
import { validate as uuidValidate } from "uuid";
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
	async update(req: Request, res: Response, next: NextFunction) {
		try {
			let formRequest = new FormRequest();
			Object.assign(formRequest, req.body);
			Object.assign(formRequest, req.query);
			await Validator(formRequest, res);

			if (!uuidValidate(formRequest.formId)) throw new Error("formId is not uuid.");

			const result = await formService.update(formRequest);
			res.status(200).json(result);
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
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			let status = req.body.status;
			if (!status || status.length === 0) status = Status.ALL;
			let forms = await formService.getAll(status);
			res.status(200).json(forms);
		} catch (err) {
			next(err);
		}
	}
	async active(req: Request, res: Response, next: NextFunction) {
		try {
			const formId = req.query.formId as string;
			if (!uuidValidate(formId)) throw new Error("formId is not uuid.");
			let result = await formService.active(formId);
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}
	async archive(req: Request, res: Response, next: NextFunction) {
		try {
			const formId = req.query.formId as string;
			if (!uuidValidate(formId)) throw new Error("formId is not uuid.");
			let result = await formService.archive(formId);
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}
}
