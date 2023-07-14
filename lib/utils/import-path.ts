import path from 'node:path';
import { compileSass } from '../module/compiler.js';

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
    rootPath: string,
    outputPath: string,
    ...arg: string[]
  ): void {
    arg.forEach((file) => {
      const jointFilePath = path.join(rootPath, file);
      compileSass({ sourceDir: jointFilePath, outputDir: outputPath });
    });
  }
}

/**
 * Shortcut for importing Sass files from custom paths and compiling them.
 */
export const { importPath } = ImportPath;
