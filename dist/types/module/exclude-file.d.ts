/**
 * Represents an excluded file.
 * @module
 */
declare class ExcludeFile {
    /**
     * Excludes a file from a list of excluded files based on matching patterns.
     *
     * @param {string[]} excludedFile - The array of excluded file paths.
     * @param {string} src - The file path to be checked for exclusion.
     *
     * @returns {string[]} The updated array of file paths after excluding the specified file.
     */
    static excludeFile(excludedFile: string[], src: string): string[];
}
export default ExcludeFile;
