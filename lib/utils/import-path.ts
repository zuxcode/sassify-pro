import path from 'node:path';
import { compileSass } from '../module/compiler.js';

import { readAndUpdateConfig } from '../config/read-and-update-config.js';

/**
 * Utility class for importing Sass files from custom paths.
 */
export default class ImportPath {
  /**
   * Imports Sass files from custom paths and compiles them.
   *
   * @param rootPath - The root path where the Sass files are located.
   * @param outputPath - The output path for the compiled CSS files.
   * @param arg - The list of files to import and compile.
   */
  public static importPath(
    sassFilePath: string,
    cssOutputPath: string,
    ...arg: string[]
  ): void {
    function compile() {
      function forEachCallBack(file: string) {
        const sassFile = path.join(sassFilePath, file);
        compileSass({
          sassFilePath: sassFile,
          cssOutputPath,
        });
      }

      arg.forEach(forEachCallBack);
    }

    compile();
  }
}

/**
 * Shortcut for importing Sass files from custom paths and compiling them.
 */
export const { importPath } = ImportPath;

(async () => {
  try {
    const opts = await readAndUpdateConfig();
    if (opts.importPaths.length === 0) return;
    const { importPaths, baseDir, cssOutputPath } = opts;
    importPath(baseDir, cssOutputPath, ...importPaths);
  } catch (error) {
    console.log(error);
  }
})();
