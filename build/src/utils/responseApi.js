"use strict";
/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Huda Prasetyo
 * @since   2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const error = (message, errors = null) => {
    return {
        message,
        errors,
    };
};
exports.error = error;
