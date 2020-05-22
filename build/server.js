"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path = __importStar(require("path"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var app = express_1.default();
var PORT = 5000;
var staticFolder = path.resolve("static");
app.use(express_fileupload_1.default());
app.use(express_1.default.static("static"));
app.get(["/", "/demo", "/about"], function (req, res) { return res.sendFile("index.html", { root: staticFolder }); });
app.post("/braille/:lang", function (req, res) {
    var _a;
    try {
        var file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
        var lang = req.params.lang;
        if (file === undefined) {
            res.status(500).send("No uploaded file detected.");
        }
        console.log({ file: file, lang: lang });
        res.send({
            route: "downloads/1588170336.3559759.pdf",
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
});
app.get("/downloads/:pdfName", function (req, res) {
    res.download(path.resolve("downloads", req.params.pdfName));
});
app.listen(PORT, function () { return console.info("Listening on port " + PORT); });
