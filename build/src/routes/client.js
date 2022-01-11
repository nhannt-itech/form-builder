"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../apis/controllers");
const routes = express_1.default.Router();
routes.post("/forms/list", controllers_1.FormController.list);
routes.post("/forms", controllers_1.FormController.save);
exports.default = routes;
