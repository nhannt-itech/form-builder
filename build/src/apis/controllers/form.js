"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormController = void 0;
const models_1 = require("../../models");
const services_1 = require("../services");
const utils_1 = require("../../utils");
const responseApi_1 = require("../../utils/responseApi");
class formController {
    save(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let formRequest = new models_1.FormRequest();
                Object.assign(formRequest, req.body);
                const errors = yield (0, utils_1.Validator)(formRequest);
                if (errors.length) {
                    res.status(400).json((0, responseApi_1.error)("Validations errors", errors));
                }
                else {
                    const formId = yield services_1.FormService.save(formRequest);
                    res.status(200).json({ formId });
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let formListRequest = new models_1.FormListRequest();
                Object.assign(formListRequest, req.body);
                let result = yield services_1.FormService.list(formListRequest);
                res.status(200).json(Object.assign({}, result));
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.FormController = new formController();
