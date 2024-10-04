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
exports.Braille = void 0;
const errors_1 = require("@feathersjs/errors");
const translate_1 = __importDefault(require("./helpers/translate"));
const pdf = __importStar(require("./helpers/pdf"));
const hin_1 = __importDefault(require("./helpers/hin"));
const eng_1 = __importDefault(require("./helpers/eng"));
const MAX_LENGTH = 2000;
class Braille {
    constructor(options = {}, app) {
        this.options = options;
        this.app = app;
    }
    async create(data, params) {
        var _a;
        if (Array.isArray(data)) {
            return Promise.all(data.map(current => this.create(current, params)));
        }
        const { file } = params;
        const lang = (_a = params.query) === null || _a === void 0 ? void 0 : _a.lang;
        let pdfText = await pdf.read(file.buffer);
        let brailleText = '';
        if (brailleText === 'Failed') {
            throw new Error('Conversion to Braille Failed.');
        }
        if (lang === 'hi') {
            const toConvert = [];
            for (let i = 0; i < pdfText.length; i += MAX_LENGTH) {
                toConvert.push(pdfText.slice(i, i + MAX_LENGTH));
            }
            pdfText = (await Promise.all(toConvert.map(slice => (0, translate_1.default)(slice)))).join(' ');
            brailleText = (0, hin_1.default)(pdfText);
        }
        else if (lang === 'en') {
            brailleText = (0, eng_1.default)(pdfText);
        }
        await pdf.write(brailleText, file.originalname);
        return {
            route: `downloads/${file.originalname}`,
        };
    }
    find(params) {
        throw new errors_1.NotImplemented('Method not implemented.');
    }
    get(id, params) {
        throw new errors_1.NotImplemented('Method not implemented.');
    }
    update(id, data, params) {
        throw new errors_1.NotImplemented('Method not implemented.');
    }
    patch(id, data, params) {
        throw new errors_1.NotImplemented('Method not implemented.');
    }
    remove(id, params) {
        throw new errors_1.NotImplemented('Method not implemented.');
    }
}
exports.Braille = Braille;
