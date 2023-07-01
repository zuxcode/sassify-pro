"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const config_compiler_js_1 = __importDefault(require("./config-compiler.js"));
/**
 * Represents a class that reads a configuration file and
 * implements the `SearchFileInterface`.
 * @extends CompilerConfig
 * @implements SearchFileInterface
 */
class ReadConfigFile extends config_compiler_js_1.default {
    /**
     * The path to the configuration file.
     */
    configPath;
    /**
     * Regular expression to match white space or empty string.
     */
    matchWhiteSpaceEmptyString;
    /**
     * Creates an instance of `ReadConfigFile` class.
     */
    constructor() {
        super();
        this.matchWhiteSpaceEmptyString = /^$|\s+/;
        this.userConfig = {};
    }
    /**
     * Retrieves the configuration from the 'sassifypro.json'
     * file or returns the default configuration.
     *
     * @returns {ConfigInterface} The configuration object retrieved
     * from the 'sassifypro.json' file if it exists and contains valid
     *  JSON data. If the file is not found, empty, or there is an error
     * while reading or parsing the file, it returns the default configuration.
     */
    getConfig() {
        console.log('Fetching configuration  file');
        const configPath = node_path_1.default.join(process.cwd(), 'sassifypro.json');
        const isConfigExist = fs.existsSync(configPath);
        if (!isConfigExist) {
            return this.config;
        }
        const isExist = fs.existsSync(this.configPath);
        if (!isExist) {
            console.log('Invalid path: Configuration file does not exit. Loading default configuration');
            return this.config;
        }
        const configStat = fs.statSync(this.configPath);
        const CheckConfigFileSize = configStat.size === 0;
        if (CheckConfigFileSize) {
            console.log('Loading default configuration');
            return this.config;
        }
        try {
            const ReadUserConfig = fs.readFileSync(this.configPath, 'utf-8');
            const parseUserConfig = JSON.parse(ReadUserConfig);
            if (parseUserConfig) {
                this.config = parseUserConfig;
                return this.config;
            }
        }
        catch (error) {
            console.log('Loading Configuration');
        }
        return this.config;
    }
}
exports.default = ReadConfigFile;
