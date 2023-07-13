import { Options } from 'sass';

/**
 * Options for Sass compilation.
 */
export interface SassOptions extends Options<'async'> {
  /**
   * The output directory for compiled CSS files.
   */
  outputDir?: string;

  /**
   * Specifies whether to enable autoprefixer for vendor prefixing.
   */
  autoprefixer?: boolean;

  /**
   * Regular expression to exclude paths from Sass compilation.
   */
  excludePaths?: RegExp;

  /**
   * Additional import paths to resolve Sass imports.
   */
  importPaths?: string[];

  /**
   * Specifies whether to watch for changes and recompile Sass files automatically.
   */
  watch?: boolean;

  /**
   * The source directory containing Sass files.
   */
  sourceDir?: string;
}
