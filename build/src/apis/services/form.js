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
const db_1 = __importDefault(require("../../database/db"));
const uuid_1 = require("uuid");
const utils_1 = require("../../utils");
class FormService {
    save(formRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, formElements } = formRequest;
            const formId = (0, uuid_1.v4)();
            return yield db_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                yield trx("Forms").insert({ formId, name, description }, "formId");
                yield trx("FormVersions").insert({
                    formVersionId: (0, uuid_1.v4)(),
                    formId,
                    versionNo: "1",
                    formElements,
                });
                return formId;
            }));
        });
    }
    update(formRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { formId, name, description, formElements } = formRequest;
            const form = yield (0, db_1.default)("Forms").where("formId", formId).first();
            if (form) {
                const { formVersionId } = (yield (0, db_1.default)("FormVersions")
                    .select("formVersionId")
                    .where("formId", formId)
                    .max("versionNo")
                    .groupBy("formVersionId")
                    .first());
                const latestFormVersion = yield (0, db_1.default)("FormVersions")
                    .where("formVersionId", formVersionId)
                    .first();
                console.log(formVersionId);
                return yield db_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    yield trx("Forms").where("formId", formId).update({ name, description });
                    if (!(0, utils_1.CompareObjects)(latestFormVersion.formElements, formElements)) {
                        yield trx("FormVersions").insert({
                            formVersionId: (0, uuid_1.v4)(),
                            formId,
                            versionNo: Number(latestFormVersion.versionNo) + 1,
                            formElements,
                        });
                    }
                    return true;
                }));
            }
            else
                return false;
        });
    }
    list(formListRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search, status, page, pageSize } = formListRequest;
            const offset = (page - 1) * pageSize;
            const { totalPage } = (yield (0, db_1.default)("Forms")
                .where("name", "like", "%" + search + "%")
                .count("name", "like", "%" + search + "%", "as totalPage")
                .whereIn("status", status)
                .first());
            const nextPage = page * pageSize < totalPage;
            const latestFormVersions = db_1.default
                .from("FormVersions")
                .innerJoin((0, db_1.default)("FormVersions")
                .select("formId")
                .max({ versionNo: "versionNo" })
                .groupBy("formId")
                .as("b"), function () {
                this.on("FormVersions.formId", "b.formId").on("FormVersions.versionNo", "b.versionNo");
            })
                .select("FormVersions.formId", "FormVersions.versionNo", {
                updatedAt: "FormVersions.createdAt",
            })
                .as("FormVersions");
            const forms = yield (0, db_1.default)("Forms")
                .select("name", "status", "versionNo", "updatedAt")
                .where("name", "like", "%" + search + "%")
                .whereIn("status", status)
                .join(latestFormVersions, "FormVersions.formId", "Forms.formId")
                .limit(pageSize)
                .offset(offset);
            return { forms, nextPage };
        });
    }
}
exports.default = FormService;
