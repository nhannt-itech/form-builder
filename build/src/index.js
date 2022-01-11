"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware");
const dotenv = __importStar(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const client_1 = __importDefault(require("./routes/client"));
dotenv.config();
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
exports.app.use((0, morgan_1.default)("tiny"));
exports.app.use(express_1.default.json());
exports.app.use("/api", client_1.default);
exports.app.use(middleware_1.errorHandler);
exports.app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});
