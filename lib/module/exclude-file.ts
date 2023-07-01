/**
 * Represents an excluded file.
 * @module
 */

class ExcludeFile {
  /**
   * Excludes a file from a list of excluded files based on matching patterns.
   *
   * @param {string[]} excludedFile - The array of excluded file paths.
   * @param {string} src - The file path to be checked for exclusion.
   *
   * @returns {string[]} The updated array of file paths after excluding the specified file.
   */

  public static excludeFile(excludedFile: string[], src: string): string[] {
    const fileDependency: string[] = [];

    const isEmptyPath = excludedFile.length === 0;

    if (isEmptyPath) fileDependency.push(src);
    else {
      const matchWhiteSpaceEmptyString = /^$|\s+/;

      const isInvalidPath = (path: string) => matchWhiteSpaceEmptyString.test(path);

      excludedFile.forEach((file) => {
        if (isInvalidPath(file)) {
          fileDependency.push(src);
        } else if (!file.match(src)) {
          fileDependency.push(src);
        }
      });
    }

    return fileDependency;
  }
}

export default ExcludeFile;
