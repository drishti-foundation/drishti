"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const braille_class_1 = require("./braille.class");
const braille_hooks_1 = __importDefault(require("./braille.hooks"));
const multerMultipart = (0, multer_1.default)();
exports.default = () => (app) => {
    const options = {
        paginate: app.get('paginate'),
    };
    app.use('/braille', multerMultipart.single('file'), (req, _, next) => {
        if (req.feathers) {
            req.feathers.file = req.file;
        }
        else {
            req.feathers = {
                file: req.file,
            };
        }
        next();
    }, new braille_class_1.Braille(options, app));
    const service = app.service('braille');
    service.hooks(braille_hooks_1.default);
};
