"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const responseApi_1 = require("../utils/responseApi");
function errorHandler(err, req, res, next) {
    return res.status(500).json((0, responseApi_1.error)(err.message));
}
exports.errorHandler = errorHandler;
