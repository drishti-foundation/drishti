"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPdf = void 0;
var pdfreader_1 = require("pdfreader");
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
