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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * @callback CompileSass
 * @description Compile sass/scss to css
 */
class CompileSass {
    sassifyProJson;
    configPath;
    fileDependency;
    ignoreDependency;
    constructor() {
        this.configPath = path_1.default.join(process.cwd(), 'sassifypro.json');
        this.ignoreDependency = [];
        this.fileDependency = [];
        this.sassifyProJson = {
            autoprefixer: true,
            outputDir: 'public',
            sourceDir: 'src',
            style: 'expanded',
            sourceMap: true,
            watch: false,
            excludePaths: [],
            importPaths: [],
            quietDeps: false,
            sourceMapIncludeSources: false,
            verbose: false,
        };
    }
    /**
     * @method readSassifyProJson
     * @description read the sassifypro.json or load default settings
     * @returns void
     */
    readSassifyProJson() {
        console.log('searching for custom config settings');
        if (!fs_1.default.existsSync(this.configPath)) {
            console.log('searching for custom config settings');
            console.log('can not find custom config, fall back to default default config');
        }
        else {
            console.log('Parsing config settings');
            this.sassifyProJson = JSON.parse(fs_1.default.readFileSync(this.configPath, 'utf-8'));
        }
    }
    /**
     * @method searchFile
     * @description search and retrieve all sass files is the src directory
     * @returns void
     */
    searchFile() {
        const rootStack = fs_1.default.readdirSync(this.sassifyProJson.sourceDir);
        let pathName;
        const subDirectory = [];
        // const FileDependency = [];
        /**
         * @description loop through the root directory and sub directory and retrieve all sass file
         */
        rootStack.forEach((currentStack) => {
            const fullPath = path_1.default.join(this.sassifyProJson.sourceDir, currentStack);
            const statPath = fs_1.default.statSync(fullPath);
            /**
             * @description check if currentStack is a directory
             */
            if (statPath.isDirectory()) {
                const subdir = fs_1.default.readdirSync(fullPath);
                subDirectory.push(...subdir);
                pathName = fullPath;
            }
            else if (fullPath.match(/.s[ac]ss$/)) {
                this.fileDependency.push(fullPath);
            }
            while (subDirectory.length > 0) {
                const childStack = subDirectory.pop();
                const childStackPath = path_1.default.join(pathName, childStack);
                const childStackStat = fs_1.default.statSync(childStackPath);
                if (childStackStat.isDirectory()) {
                    const subdir = fs_1.default.readdirSync(childStackPath);
                    subDirectory.push(...subdir);
                    pathName = childStackPath;
                }
                else if (fullPath.match(/.s[ac]ss$/)) {
                    this.fileDependency.push(childStackPath);
                }
            }
        });
    }
    // fileIgnore() {
    //   this.sassifyProJson.excludePaths.forEach((file) => {});
    // }
    /**
     * @method compiler
     * @description the method calls the sass compiler. and compiler the given files
     */
    compiler() {
        console.log('Starting SassifyPro');
        this.readSassifyProJson();
        console.log('Reading Project directory');
        this.searchFile();
        /**
         * @description resolve output path
         */
        const outputPath = path_1.default.resolve(process.cwd(), this.sassifyProJson.outputDir);
        console.log('Checking if out path exist');
        this.fileDependency.forEach((file) => {
            sass.compile(file, {
                alertAscii: true,
                alertColor: true,
                charset: true,
                quietDeps: this.sassifyProJson.quietDeps,
                sourceMap: this.sassifyProJson.sourceMap,
                sourceMapIncludeSources: this.sassifyProJson.sourceMapIncludeSources,
                style: this.sassifyProJson.style,
            });
        });
        /**
         * @description check if output part exist,
         * if path is not found, create path
         */
        if (fs_1.default.existsSync(outputPath)) {
            console.log('Create Output Path');
            fs_1.default.mkdirSync(outputPath, { recursive: true });
            console.log('override file');
            const exet = outputPath.replace(/.s[ac]ss$/, '.css');
            console.log('Writing File');
            fs_1.default.writeFileSync(`${outputPath}${exet}`, 'utf8');
        }
    }
}
exports.default = CompileSass;
