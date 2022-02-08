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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const utils_1 = require("../../utils");
const form_1 = __importDefault(require("../services/form"));
const formService = new form_1.default();
class FormController {
    save(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let formRequest = new models_1.FormRequest();
                Object.assign(formRequest, req.body);
                yield (0, utils_1.Validator)(formRequest, res);
                const formId = yield formService.save(formRequest);
                res.status(200).json({ formId });
            }
            catch (err) {
                next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let formRequest = new models_1.FormRequest();
                Object.assign(formRequest, req.body);
                Object.assign(formRequest, req.query);
                yield (0, utils_1.Validator)(formRequest, res);
                const result = yield formService.update(formRequest);
                res.status(200).json({ result });
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
                let result = yield formService.list(formListRequest);
                res.status(200).json(Object.assign({}, result));
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = FormController;
