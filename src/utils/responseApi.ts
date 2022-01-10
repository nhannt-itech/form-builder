/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Huda Prasetyo
 * @since   2020
 */

interface ResponseObject {
	results: any;
	message: string;
	success: boolean;
	code: number;
}

export const error = (message: string, errors: any = null) => {
	return {
		message,
		errors,
	};
};
