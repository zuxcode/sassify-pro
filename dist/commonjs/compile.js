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
const sass = __importStar(require("sass"));
const fs = __importStar(require("node:fs"));
const path_1 = __importDefault(require("path"));
const search_file_js_1 = __importDefault(require("./module/search-file.js"));
const read_config_js_1 = __importDefault(require("./config/read-config.js"));
/**
 * Represents a class that compiles Sass files based on the configuration settings.
 * @extends ReadConfigFile
 */
class CompileSass extends read_config_js_1.default {
    /**
     * Compiles Sass files based on the configuration settings.
     */
    compiler() {
        console.log('Starting SassifyPro');
        const config = this.getConfig();
        console.log('Reading Project directory');
        const files = search_file_js_1.default.searchFile(config.sourceDir, config.excludePaths);
        files.forEach((file) => {
            (async () => {
                const compileResult = await sass.compileAsync(file, {
                    alertAscii: true,
                    alertColor: true,
                    charset: true,
                    quietDeps: config.quietDeps,
                    sourceMap: config.sourceMap,
                    sourceMapIncludeSources: config.sourceMapIncludeSources,
                    style: config.style,
                    verbose: config.verbose,
                });
                const { loadedUrls } = compileResult;
                loadedUrls.forEach((url) => {
                    if (!fs.existsSync(config.outputDir)) {
                        console.log('Create Output Path');
                        fs.mkdirSync(config.outputDir, { recursive: true });
                        console.log('override file');
                        const fileName = path_1.default.basename(url.pathname);
                        console.log('Writing File');
                        const renameFile = fileName.replace(/.s[ac]ss$/, '.css');
                        fs.writeFileSync(path_1.default.join(config.outputDir, renameFile), compileResult.css);
                    }
                    else {
                        const fileName = path_1.default.basename(url.pathname);
                        console.log('Writing File');
                        const renameFile = fileName.replace(/.s[ac]ss$/, '.css');
                        fs.writeFileSync(path_1.default.join(config.outputDir, renameFile), compileResult.css);
                    }
                });
            })();
        });
    }
}
exports.default = CompileSass;
