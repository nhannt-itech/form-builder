import { validate } from "class-validator";
import { Response, NextFunction } from "express";
import { validation } from "../../utils/responseApi";

const Validator = async (object: any, res: Response, next: NextFunction) => {
	const resErrors = await validate(object);
	const errors = resErrors.map((item) => item.constraints);
	if (errors.length) return res.status(422).json(validation(errors));
	else next();
};

export default Validator;
