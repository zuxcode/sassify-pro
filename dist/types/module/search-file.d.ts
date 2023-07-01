/**
 * Represents a utility class for searching files and retrieving file dependencies.
 * @static
 * @module
 */
declare class SearchFile {
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
    static searchFile(sourcePath: string, excludePath: string[]): string[];
}
export default SearchFile;
