"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const feathersAuthentication = __importStar(require("@feathersjs/authentication"));
const local = __importStar(require("@feathersjs/authentication-local"));
const errors_1 = require("@feathersjs/errors");
const feathers_hooks_common_1 = require("feathers-hooks-common");
const onlyAdmin_1 = __importDefault(require("../../hooks/onlyAdmin"));
const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;
exports.default = {
    before: {
        all: [],
        find: [authenticate('jwt'), (0, onlyAdmin_1.default)()],
        get: [authenticate('jwt')],
        create: [
            (0, feathers_hooks_common_1.validate)(values => {
                if (!values.password || !values.username) {
                    throw new errors_1.BadRequest('Both a username and password must be given');
                }
                return null;
            }),
            hashPassword('password'),
            ({ params }) => {
                var _a;
                if (!((_a = params === null || params === void 0 ? void 0 : params.query) === null || _a === void 0 ? void 0 : _a.otp)) {
                    throw new errors_1.BadRequest('OTP not found: A OTP must be given as a query');
                }
            },
        ],
        update: [hashPassword('password'), authenticate('jwt')],
        patch: [hashPassword('password'), authenticate('jwt')],
        remove: [authenticate('jwt')],
    },
    after: {
        all: [
            protect('password'),
        ],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
