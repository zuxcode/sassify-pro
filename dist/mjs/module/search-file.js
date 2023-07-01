import path from 'node:path';
import * as fs from 'node:fs';
import ExcludeFile from './exclude-file.js';
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
            const stackFullPath = path.join(sourcePath, currentStack);
            const exclude = ExcludeFile.excludeFile(excludePath, stackFullPath);
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
                    const childStackPath = path.join(pathName, childStack);
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
export default SearchFile;
