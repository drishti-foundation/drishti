"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePdf = exports.readPdf = void 0;
var path_1 = __importDefault(require("path"));
var pdfreader_1 = require("pdfreader");
var html_pdf_1 = __importDefault(require("html-pdf"));
exports.readPdf = function (buffer) {
    return new Promise(function (res) {
        var pdfText = "";
        new pdfreader_1.PdfReader().parseBuffer(buffer, function (err, item) {
            if (err) {
                console.error(err);
            }
            else if (!item) {
                res(pdfText);
            }
            else if (item.text) {
                pdfText += item.text + " ";
            }
        });
    });
};
exports.writePdf = function (text, fileName) {
    return new Promise(function (res) {
        html_pdf_1.default
            .create("<h1>Braille</h1><p>" + text + "</p>")
            .toFile(path_1.default.resolve("downloads", fileName), function (err) {
            if (err)
                console.error(err);
            res();
        });
    });
};
