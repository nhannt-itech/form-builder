"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const form_1 = __importDefault(require("../apis/controllers/form"));
const formController = new form_1.default();
const routes = express_1.default.Router();
routes.post("/forms/list", formController.list);
routes.post("/forms", formController.save);
routes.put("/forms", formController.update);
exports.default = routes;
