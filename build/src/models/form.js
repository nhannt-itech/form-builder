"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormListResponse = exports.FormObject = exports.FormListRequest = exports.FormRequest = exports.Form = void 0;
const class_validator_1 = require("class-validator");
class Form {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], Form.prototype, "formId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], Form.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], Form.prototype, "status", void 0);
exports.Form = Form;
//
class FormRequest {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], FormRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], FormRequest.prototype, "formElements", void 0);
exports.FormRequest = FormRequest;
//for listing
class FormListRequest {
    constructor() {
        this.search = "";
        this.status = ["Active", "Archived", "In Use", "Pending"];
        this.page = 1;
        this.pageSize = 10;
    }
}
exports.FormListRequest = FormListRequest;
class FormObject {
}
exports.FormObject = FormObject;
class FormListResponse {
}
exports.FormListResponse = FormListResponse;
