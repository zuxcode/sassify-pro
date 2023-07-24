import { createSpinner } from 'nanospinner';
import { red } from 'colorette';

import { compileSass } from './compiler.js';
import { watchSass } from '../utils/watch.js';
import { importPath } from '../utils/import-path.js';
import { version, message, CreateSassifyproFile } from '../cli/initialize.js';

type Options =
  | 'compile'
  | 'c'
  | '--version'
  | '-v'
  | 'watch'
  | 'w'
  | '--source-map'
  | '--import-path'
  | '--style'
  | '-s'
  | '--autoprefixer'
  | '-a'
  | '--init'
  | '--help'
  | '-h';
/**
 * Main class for SassifyPro.
 */
export default class SassifyPro {
  /**
   * Displays an error message for invalid source path.
   */
  private static InvalidSrcPath(): void {
    createSpinner().error({
      text: red(
        'Error: The "path" argument must be of type string. Received undefined',
      ),
    });
  }

  /**
   * Parses command line arguments and performs the corresponding action.
   * @param flag - The command line flag.
   * @param index - The index of the flag in the argument list.
   * @param argv - The array of command line arguments.
   */
  private static parseArguments(
    flag?: Options,
    index?: number,
    argv?: string[],
  ): void {
    const compileSrc = argv[index + 1];
    const compileOutput = argv[index + 2];
    const importPathOutput = argv[argv.length - 1];
    const importPathSrc = argv.slice(3, argv.length - 1);

    switch (flag) {
      case '--version':
      case '-v':
        version();
        break;

      case 'compile':
      case 'c':
        if (!compileSrc) {
          compileSass({
            sassFilePath: compileSrc,
            cssOutputPath: compileOutput,
          });

          return;
        }

        if (compileSrc.match(/^-+/)) return;

        compileSass({
          sassFilePath: compileSrc,
          cssOutputPath: compileOutput,
        });
        break;

      case 'watch':
      case 'w':
        if (!compileSrc) {
          SassifyPro.InvalidSrcPath();
          return;
        }

        if (compileSrc.match(/^-+/)) return;

        watchSass(compileSrc, compileOutput);
        break;

      case '--import-path':
        if (importPathSrc.length === 0) {
          SassifyPro.InvalidSrcPath();
          return;
        }

        importPath(compileSrc, importPathOutput, ...importPathSrc);
        break;

      case '--init':
        CreateSassifyproFile();
        break;

      case '--source-map':
        break;

      case '--style':
      case '-s':
        break;

      case '--autoprefixer':
      case '-a':
        break;

      case '--help':
      case '-h':
        break;

      default:
        // eslint-disable-next-line no-case-declarations
        const __exhaustiveCheck: string = flag;
        if (__exhaustiveCheck.match(/^-+/)) {
          createSpinner().error({
            text: red(`bad option: ${flag}`),
          });
        }
        break;
    }
  }

  /**
   * Runs the SassifyPro command line tool.
   */
  public static sassifypro(): void {
    if (process.argv.length <= 2) {
      message();
    } else {
      const args = process.argv.slice(2);

      args.find(SassifyPro.parseArguments);
    }
  }
}

/**
 * The run method of SassifyPro class.
 */

if (typeof require !== 'undefined' && require.main === module) {
  const { sassifypro } = SassifyPro;

  if (require.main === module) {
    sassifypro();
  }
}

export const { sassifypro } = SassifyPro;
