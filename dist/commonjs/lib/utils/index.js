"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init = exports.Cli = void 0;
var cli_js_1 = require("./cli.js");
Object.defineProperty(exports, "Cli", { enumerable: true, get: function () { return __importDefault(cli_js_1).default; } });
// export { default as DebugLogger } from './log.js';
var init_js_1 = require("./init.js");
Object.defineProperty(exports, "Init", { enumerable: true, get: function () { return __importDefault(init_js_1).default; } });
