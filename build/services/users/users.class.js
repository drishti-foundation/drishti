"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const feathers_nedb_1 = require("feathers-nedb");
const errors_1 = require("@feathersjs/errors");
class Users extends feathers_nedb_1.Service {
    constructor(options, app, otpHandler) {
        super(options);
        this.otpHandler = otpHandler;
    }
    async create(data, params) {
        var _a;
        if (await this.otpHandler.validateOTP((_a = params === null || params === void 0 ? void 0 : params.query) === null || _a === void 0 ? void 0 : _a.otp)) {
            return super.create(data, params);
        }
        throw new errors_1.NotAuthenticated('Invalid OTP: A valid OTP must be provided');
    }
}
exports.Users = Users;
