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
    cb: (error: Error | null, result: string[] | null) => void,
    excludePattern?: RegExp,
  ): Promise<void> {
    const fileDependency: string[] = [];
    const fileExtensionPattern = '.@(sass|scss)';
    const excludeRegex = excludePattern ?? /\/node_modules\/*\//;
    const globPattern = `${sourcePattern}/**/*${fileExtensionPattern}`;

    return new Promise<void>((resolve, reject) => {
      glob(globPattern, { stat: true }).then((files) => {
        const filteredFiles = files.filter((file) => !excludeRegex.test(file));

        filteredFiles.forEach((file) => {
          fileDependency.push(file);
          resolve();
        });
      });
    })
      .then(() => cb(null, fileDependency))
      .catch((error) => cb(error, null));
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
