"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_func_class_1 = require("./admin-func.class");
const admin_func_hooks_1 = __importDefault(require("./admin-func.hooks"));
exports.default = (otpHandler) => (app) => {
    const options = {
        paginate: app.get('paginate'),
    };
    app.use('/admin-func', new admin_func_class_1.AdminFunc(options, app, otpHandler));
    const service = app.service('admin-func');
    service.hooks(admin_func_hooks_1.default);
};
