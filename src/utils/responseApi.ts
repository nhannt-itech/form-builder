/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Huda Prasetyo
 * @since   2020
 */

export const error = (message: string, errors: any = null) => {
	return {
		message,
		errors,
	};
};
