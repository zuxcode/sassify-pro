"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerConfig = exports.Config = void 0;
var meta_detail_js_1 = require("./meta-detail.js");
Object.defineProperty(exports, "Config", { enumerable: true, get: function () { return __importDefault(meta_detail_js_1).default; } });
var config_compiler_js_1 = require("./config-compiler.js");
Object.defineProperty(exports, "CompilerConfig", { enumerable: true, get: function () { return __importDefault(config_compiler_js_1).default; } });
