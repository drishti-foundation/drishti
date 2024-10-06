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
const authentication = __importStar(require("@feathersjs/authentication"));
const feathers_hooks_common_1 = require("feathers-hooks-common");
const errors_1 = require("@feathersjs/errors");
const allowAnonymous_1 = __importDefault(require("../../hooks/allowAnonymous"));
const { authenticate } = authentication.hooks;
const SUPPORTED_LANGS = new Set(['en', 'hi']);
exports.default = {
    before: {
        all: [
            (0, allowAnonymous_1.default)(),
            authenticate('jwt', 'anonymous'),
            (context) => {
                var _a, _b;
                const { params } = context;
                if (!((_a = params === null || params === void 0 ? void 0 : params.query) === null || _a === void 0 ? void 0 : _a.lang)) {
                    throw new errors_1.BadRequest('Language not found: A language must be given as a query');
                }
                else if (!SUPPORTED_LANGS.has(params.query.lang)) {
                    throw new errors_1.BadRequest('Unsupported language', {
                        languageGiven: (_b = params === null || params === void 0 ? void 0 : params.query) === null || _b === void 0 ? void 0 : _b.lang,
                        supportedLanguages: Array.from(SUPPORTED_LANGS),
                    });
                }
                return context;
            },
        ],
        find: [(0, feathers_hooks_common_1.disallow)()],
        get: [(0, feathers_hooks_common_1.disallow)()],
        create: [],
        update: [(0, feathers_hooks_common_1.disallow)()],
        patch: [(0, feathers_hooks_common_1.disallow)()],
        remove: [(0, feathers_hooks_common_1.disallow)()],
    },
    after: {
        all: [],
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
