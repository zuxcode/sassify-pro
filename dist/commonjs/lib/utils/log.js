"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boxen_1 = __importDefault(require("boxen"));
class DebugLogger {
    constructor() {
        (0, boxen_1.default)('No Message', { padding: 1, borderStyle: 'double' });
    }
    static log(info) {
        console.log(info);
        console.log();
    }
}
exports.default = DebugLogger;
