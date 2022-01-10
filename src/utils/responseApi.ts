/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Huda Prasetyo
 * @since   2020
 */

export const success = (results: any, message: string, statusCode: number) => {
	return {
		message,
		error: false,
		code: statusCode,
		results,
	};
};

export const error = (message: string, statusCode: number) => {
	// List of common HTTP request code
	const codes = [200, 201, 400, 401, 404, 403, 422, 500];

	// Get matched code
	const findCode = codes.find((code) => code == statusCode);

	if (!findCode) statusCode = 500;
	else statusCode = findCode;

	return {
		message,
		error: true,
		code: statusCode,
	};
};

export const validation = (errors: any) => {
	return {
		message: "Validation errors",
		error: true,
		code: 422,
		errors,
	};
};
