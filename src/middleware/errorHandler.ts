import express, { NextFunction } from "express";
import { error } from "../utils/responseApi";

export function errorHandler(
	err: Error,
	req: express.Request,
	res: express.Response,
	next: NextFunction
) {
	return res.status(500).json(error(err.message, res.statusCode));
}
