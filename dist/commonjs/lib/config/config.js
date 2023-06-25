"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Config {
    program;
    name;
    version;
    filePath;
    packageJson;
    constructor() {
        this.filePath = path_1.default.resolve(process.cwd(), 'package.json');
        this.packageJson = JSON.parse(fs_1.default.readFileSync(this.filePath, 'utf8'));
        this.program = new commander_1.Command();
        this.name = this.program.name('SassifyPro');
        this.version = this.program.version('SassifyPro');
    }
}
exports.default = Config;
