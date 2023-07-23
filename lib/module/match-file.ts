/* eslint-disable no-unused-vars */
import { glob } from 'glob';

/**
 * Utility class for matching file paths.
 */
export default class MatchFilePath {
  /**
   * Matches file paths based on the provided source pattern and optional exclude pattern.
   *
   * @param sourcePattern - The source pattern for matching files.
   * @param cb - The callback function to handle the result or error.
   * @param excludePattern - The optional regular expression pattern to exclude paths.
   * @returns A promise that resolves to void.
   */
  public static async matchFile(
    sourcePattern: string,
    cb?: (error: Error | null, result: string[] | null) => void,
    excludePattern?: RegExp,
  ): Promise<string[]> {
    const fileDependency: string[] = [];
    return new Promise<string[]>((resolve, reject) => {
      const fileExtensionPattern = '.@(sass|scss)';

      const excludeRegex = excludePattern ?? /\/node_modules\/*\//;

      const globPattern = `${sourcePattern}/**/*${fileExtensionPattern}`;

      function globThenFunc(files: string[]) {
        const filteredFiles = files.filter((file) => !excludeRegex.test(file));

        function updateFileDep(file: string) {
          fileDependency.push(file);
        }

        filteredFiles.forEach(updateFileDep);
      }

      function resolveFuc() {
        cb(null, fileDependency);
        resolve(fileDependency);
      }

      function rejectFuc(error: Error) {
        cb(error, null);
        reject(error);
      }

      glob(globPattern, { stat: true })
        .then(globThenFunc)

        .then(resolveFuc)
        .catch(rejectFuc);
    });
  }
}

/**
 * Shortcut for matching file paths.
 *
 * @param sourcePattern - The source pattern for matching files.
 * @param cb - The callback function to handle the result or error.
 * @param excludePattern - The optional regular expression pattern to exclude paths.
 * @returns A promise that resolves to void.
 */
export const { matchFile } = MatchFilePath;
