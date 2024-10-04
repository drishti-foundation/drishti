"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@feathersjs/errors");
exports.default = () => async (context) => {
    var _a;
    const { params } = context;
    if (params.provider && ((_a = params.user) === null || _a === void 0 ? void 0 : _a.username) !== 'admin') {
        throw new errors_1.Forbidden('Admin access only');
    }
    return context;
};
