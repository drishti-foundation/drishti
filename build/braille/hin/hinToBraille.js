"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mapHinToBraille_1 = __importDefault(require("./mapHinToBraille"));
var bin2braille = function (s) {
    var hexstr = parseInt(s.split("").reverse().join(""), 2)
        .toString(16)
        .slice(0, 2);
    var basehex = "0x2800";
    var braillehex = "";
    if (hexstr.length == 2) {
        braillehex += basehex.slice(0, 4) + hexstr;
        return parseInt(braillehex);
    }
    else {
        braillehex += basehex.slice(0, 5) + hexstr;
        return parseInt(braillehex);
    }
};
var binStrBraille = function (s) {
    var brailleChr = "";
    for (var i = 0; i < Math.floor(s.length / 6); i++) {
        brailleChr += String.fromCharCode(bin2braille(s.slice(6 * i, 6 * i + 6)));
    }
    return brailleChr;
};
var hinToBraille = function (s) {
    var _a;
    var text = "";
    for (var i = 0; i < s.length; i++) {
        if (mapHinToBraille_1.default.has(s[i])) {
            var bin = (_a = mapHinToBraille_1.default.get(s[i])) !== null && _a !== void 0 ? _a : "?";
            text += binStrBraille(bin);
            if (bin === "000100")
                text = text.slice(0, i - 1) + text[i] + text[i - 1] + text.slice(i + 1);
        }
        else {
            text += "?";
        }
    }
    return text;
};
exports.default = hinToBraille;
