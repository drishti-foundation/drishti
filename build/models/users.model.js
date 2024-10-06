"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nedb_1 = __importDefault(require("nedb"));
const path_1 = __importDefault(require("path"));
exports.default = (app) => {
    const dbPath = app.get('nedb');
    const Model = new nedb_1.default({
        filename: path_1.default.join(dbPath, 'users.db'),
        autoload: true,
    });
    Model.ensureIndex({ fieldName: 'username', unique: true });
    return Model;
};
