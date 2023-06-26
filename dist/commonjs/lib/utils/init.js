"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_welcome_1 = __importDefault(require("cli-welcome"));
const cli_handle_unhandled_1 = __importDefault(require("cli-handle-unhandled"));
const config_js_1 = __importDefault(require("../config/config.js"));
class Init extends config_js_1.default {
    clear;
    constructor(clear = true) {
        super();
        this.clear = clear;
    }
    initialize() {
        (0, cli_welcome_1.default)({
            title: this.name,
            tagLine: `by ${this.author}`,
            description: this.description,
            version: this.version,
            bgColor: '#36BB09',
            color: '#000000',
            bold: true,
            clear: this.clear,
        });
        (0, cli_handle_unhandled_1.default)();
    }
}
exports.default = Init;
