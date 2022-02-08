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
exports.Validator = void 0;
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
const Validator = (object, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resErrors = yield (0, class_validator_1.validate)(object);
    const errors = resErrors.map((item) => item.constraints);
    if (errors.length) {
        res.status(400).json((0, utils_1.error)("Validations errors", errors));
    }
});
exports.Validator = Validator;
