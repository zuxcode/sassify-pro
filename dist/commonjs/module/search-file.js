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
const node_path_1 = __importDefault(require("node:path"));
const fs = __importStar(require("node:fs"));
const exclude_file_js_1 = __importDefault(require("./exclude-file.js"));
/**
 * Represents a utility class for searching files and retrieving file dependencies.
 * @static
 * @module
 */
class SearchFile {
    /**
     * Searches files and retrieves file dependencies based on the provided source
     *  path and exclude paths.
     *
     * @param {string} sourcePath - The path of the source directory to search for files.
     * @param {string[]} excludePath - An array of paths to exclude from the search.
     * @returns {string[]} An array of file dependencies found within the source
     * directory, excluding the specified exclude paths.
     * @throws {Error} Throws an error if the source path contains whitespace
     * or an empty string.
     */
    static searchFile(sourcePath, excludePath) {
        const matchWhiteSpaceEmptyString = /^$|\s+/;
        const childStackDirectoryDependency = [];
        const fileDependency = [];
        let pathName = '';
        /**
         * Checks if the given file path is invalid (contains whitespace or empty string).
         *
         * @param {string} filePath - The file path to check.
         * @returns {boolean} Returns true if the file path is invalid, otherwise false.
         */
        const isInvalidPath = (filePath) => matchWhiteSpaceEmptyString.test(filePath);
        if (isInvalidPath(sourcePath)) {
            throw new Error('Invalid file. File cannot contain white space or empty string');
        }
        const stack = fs.readdirSync(sourcePath);
        stack.forEach((currentStack) => {
            const stackFullPath = node_path_1.default.join(sourcePath, currentStack);
            const exclude = exclude_file_js_1.default.excludeFile(excludePath, stackFullPath);
            exclude.forEach((childStackFile) => {
                const stackFullPathStat = fs.statSync(childStackFile);
                if (stackFullPathStat.isDirectory()) {
                    const childStackDirectory = fs.readdirSync(childStackFile);
                    childStackDirectoryDependency.push(...childStackDirectory);
                    pathName = stackFullPath;
                }
                else if (stackFullPath.match(/.s[ac]ss$/)) {
                    fileDependency.push(stackFullPath);
                }
                while (childStackDirectoryDependency.length > 0) {
                    const childStack = childStackDirectoryDependency.pop();
                    const childStackPath = node_path_1.default.join(pathName, childStack);
                    const childStackFullPathStat = fs.statSync(childStackPath);
                    if (childStackFullPathStat.isDirectory()) {
                        const childStackDirectory = fs.readdirSync(childStackPath);
                        childStackDirectoryDependency.push(...childStackDirectory);
                        pathName = childStackPath;
                    }
                    else if (childStackPath.match(/.s[ac]ss$/)) {
                        fileDependency.push(childStackPath);
                    }
                }
            });
        });
        return fileDependency;
    }
}
exports.default = SearchFile;
