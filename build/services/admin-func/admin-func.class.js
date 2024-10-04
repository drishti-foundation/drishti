"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminFunc = void 0;
const errors_1 = require("@feathersjs/errors");
class AdminFunc {
    constructor(options = {}, app, otpHandler) {
        this.options = options;
        this.app = app;
        this.otpHandler = otpHandler;
    }
    async find(params) {
        return [];
    }
    async get(type, params) {
        if (type === 'otp') {
            const otp = await this.otpHandler.generateOTP();
            return {
                otp,
            };
        }
        else {
            throw new errors_1.BadRequest(`Unknown type: ${type}`);
        }
    }
    async create(data, params) {
        if (Array.isArray(data)) {
            return Promise.all(data.map(current => this.create(current, params)));
        }
        return data;
    }
    async update(id, data, params) {
        return data;
    }
    async patch(id, data, params) {
        return data;
    }
    async remove(id, params) {
        return { id };
    }
}
exports.AdminFunc = AdminFunc;
