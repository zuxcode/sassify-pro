"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hello = exports.Config = void 0;
var config_js_1 = require("./lib/config/config.js");
Object.defineProperty(exports, "Config", { enumerable: true, get: function () { return __importDefault(config_js_1).default; } });
exports.Hello = "hello";
