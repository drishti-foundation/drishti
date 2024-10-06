"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = void 0;
const path_1 = __importDefault(require("path"));
const html_pdf_1 = __importDefault(require("html-pdf"));
const textract_1 = __importDefault(require("textract"));
const read = (buffer) => new Promise((res, rej) => textract_1.default.fromBufferWithMime('application/pdf', buffer, (err, text) => {
    if (err)
        rej(err);
    res(text);
}));
exports.read = read;
const write = (text, fileName) => new Promise((res, rej) => {
    let newline_text = "";
    for (let i = 0; i < text.length; i += 50) {
        newline_text += text.slice(i, i + 50) + '<br>';
    }
    html_pdf_1.default
        .create(`<h1>Braille</h1><p>${newline_text}</p>`)
        .toFile(path_1.default.resolve('downloads', fileName), (err) => {
        if (err)
            rej(err);
        res();
    });
});
exports.write = write;
