"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapHinToBraille_1 = __importDefault(require("./mapHinToBraille"));
const bin2braille = (s) => {
    const hexstr = parseInt(s.split('').reverse().join(''), 2).toString(16).slice(0, 2);
    const basehex = '0x2800';
    let braillehex = '';
    if (hexstr.length === 2) {
        braillehex += basehex.slice(0, 4) + hexstr;
        return parseInt(braillehex);
    }
    else {
        braillehex += basehex.slice(0, 5) + hexstr;
        return parseInt(braillehex);
    }
};
const binStrBraille = (s) => {
    let brailleChr = '';
    for (let i = 0; i < Math.floor(s.length / 6); i++) {
        brailleChr += String.fromCharCode(bin2braille(s.slice(6 * i, 6 * i + 6)));
    }
    return brailleChr;
};
const hinToBraille = (s) => {
    var _a;
    let text = '';
    for (let i = 0; i < s.length; i++) {
        if (mapHinToBraille_1.default.has(s[i])) {
            const bin = (_a = mapHinToBraille_1.default.get(s[i])) !== null && _a !== void 0 ? _a : '?';
            text += binStrBraille(bin);
        }
    }
    return text;
};
exports.default = hinToBraille;
