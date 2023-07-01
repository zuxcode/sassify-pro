"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meow_1 = __importDefault(require("meow"));
const cli_meow_help_1 = __importDefault(require("cli-meow-help"));
class CLI {
    flags;
    commands;
    constructor() {
        this.flags = {
            clear: {
                type: 'boolean',
                default: true,
                alias: 'c',
                desc: 'Clear the console',
            },
            noClear: {
                type: 'boolean',
                default: false,
                desc: "Don't clear the console",
            },
            debug: {
                type: 'boolean',
                default: false,
                alias: 'd',
                desc: 'Print debug info',
            },
            version: {
                type: 'boolean',
                alias: 'v',
                desc: 'Print CLI version',
            },
        };
        this.commands = {
            help: { desc: 'Print help info' },
        };
    }
    run() {
        const helpText = (0, cli_meow_help_1.default)({
            name: 'demo-cli',
            flags: this.flags,
            commands: this.commands,
        });
        const options = {
            inferType: true,
            description: false,
            hardRejection: false,
            flags: this.flags,
        };
        const result = (0, meow_1.default)(helpText, options);
        // Do something with the parsed command-line input
        console.log(result.input);
        console.log(result.flags);
        return result;
    }
}
exports.default = CLI;
