"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var googletrans_1 = __importDefault(require("googletrans"));
var pdfHandler_1 = require("./pdfHandler");
var app = express_1.default();
var PORT = 5000;
var MAX_LENGTH = 10000;
var staticFolder = path_1.default.resolve("static");
app.use(express_fileupload_1.default());
app.use(express_1.default.static("static"));
app.get(["/", "/demo", "/about"], function (req, res) { return res.sendFile("index.html", { root: staticFolder }); });
app.post("/braille/:lang", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file, lang, pdfText, brailleText, text, toConvert, i, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
                lang = req.params.lang;
                if (file === undefined) {
                    return [2, res.status(500).send("No uploaded file detected.")];
                }
                console.log({ file: file, lang: lang });
                return [4, pdfHandler_1.readPdf(file.data)];
            case 1:
                pdfText = _b.sent();
                brailleText = void 0;
                if (!(lang === "hi")) return [3, 3];
                text = "";
                toConvert = [];
                for (i = 0; i < pdfText.length; i += MAX_LENGTH) {
                    toConvert.push(pdfText.slice(i, i + MAX_LENGTH));
                }
                return [4, Promise.all(toConvert.map(function (text) { return googletrans_1.default(text, "hi"); }))];
            case 2:
                text = (_b.sent()).map(function (result) { return result.text; }).join();
                console.log(text);
                brailleText = text;
                return [3, 4];
            case 3:
                if (lang === "en") {
                    brailleText = pdfText;
                }
                else {
                    console.error("Unrecognised language", lang);
                    return [2, res.status(500).send("Bad Language")];
                }
                _b.label = 4;
            case 4: return [4, pdfHandler_1.writePdf(brailleText, file.name)];
            case 5:
                _b.sent();
                res.send({
                    route: "downloads/" + file.name,
                });
                return [3, 7];
            case 6:
                err_1 = _b.sent();
                console.error(err_1);
                res.status(500).send("Internal server error");
                return [3, 7];
            case 7: return [2];
        }
    });
}); });
app.get("/downloads/:pdfName", function (req, res) {
    res.download(path_1.default.resolve("downloads", req.params.pdfName));
});
app.listen(PORT, function () { return console.info("Listening on port " + PORT); });
