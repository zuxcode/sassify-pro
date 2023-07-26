/* eslint-disable no-unused-vars */
import { glob } from 'glob';

/**
 * Utility class for matching file paths.
 */
export default class MatchFilePath {
  // Helper method to promisify glob
  public static globAsync(pattern: string, options: any): Promise<string[]> {
    return new Promise((resolve, reject) => {
      glob(pattern, options)
        .then((files) => resolve(files))
        .catch((error) => reject(error));
    });
  }
  /**
   * Matches file paths based on the provided source pattern and optional exclude pattern.
   *
   * @param {string} sourcePattern - The source pattern for matching files.
   * @param {RegExp} [excludePattern] - The optional regular expression pattern to exclude paths.
   * @returns {Promise<string[]>} A promise that resolves to an array of matched file paths.
   */

  public static async matchFile(
    sourcePattern: string,
    excludePattern?: RegExp,
  ): Promise<string[]> {
    const fileDependency: string[] = [];

    const fileExtensionPattern = '.@(sass|scss)';
    const globPattern = `${sourcePattern}/**/*${fileExtensionPattern}`;
    const excludeRegex = excludePattern ?? /\/node_modules\/*\//;

    try {
      const files = await MatchFilePath.globAsync(globPattern, { stat: true });
      const filteredFiles = files.filter((file) => !excludeRegex.test(file));
      fileDependency.push(...filteredFiles);
      return fileDependency;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Shortcut for matching file paths.
 *
 * @param {string} sourcePattern - The source pattern for matching files.
 * @param {RegExp} [excludePattern] - The optional regular expression pattern to exclude paths.
 * @returns {Promise<string[]>} A promise that resolves to an array of matched file paths.
 */
export const { matchFile } = MatchFilePath;
