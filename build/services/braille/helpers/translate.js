"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googletrans_1 = __importDefault(require("googletrans"));
const logger_1 = __importDefault(require("../../../logger"));
const translate = async (text) => {
    logger_1.default.info(`Translating text: ${text}`);
    const res = await (0, googletrans_1.default)(text, { from: "en", to: "hi" });
    logger_1.default.info(`Got text: ${JSON.stringify(res.text, null, 2)}`);
    return res.text;
};
exports.default = translate;
