"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const otpHandler_1 = __importDefault(require("../otpHandler"));
const users_service_1 = __importDefault(require("./users/users.service"));
const braille_service_1 = __importDefault(require("./braille/braille.service"));
const admin_func_service_1 = __importDefault(require("./admin-func/admin-func.service"));
exports.default = (app) => {
    const otpHandler = new otpHandler_1.default(path_1.default.resolve('data', 'otp.json'));
    app.configure((0, users_service_1.default)(otpHandler));
    app.configure((0, braille_service_1.default)());
    app.configure((0, admin_func_service_1.default)(otpHandler));
    app.get('/downloads/:name', (req, res) => {
        res.download(path_1.default.resolve('downloads', req.params.name));
    });
};
