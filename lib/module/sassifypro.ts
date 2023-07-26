import { createSpinner } from 'nanospinner';
import { red } from 'colorette';

import { compileSass } from './compiler.js';
import { watchSass, importPath } from '../utils/index.js';
import { version, message, createSassifyproFile } from '../cli/index.js';

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
  private static invalidSrcPath(): void {
    createSpinner().error({
      text: red(
        'Error: The "path" argument must be of type string. Received undefined',
      ),
    });
  }

  /**
   * Parses command line arguments and performs the corresponding action.
   * @param {string} flag - The command line flag.
   * @param {string[]} args - The array of command line arguments.
   */

  private static parseArguments(flag: Options, args: string[]): void {
    const compileSrc = args[0];
    const compileOutput = args[1];
    const importPathOutput = args[args.length - 1];
    const importPathSrc = args.slice(3, args.length - 1);

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
          SassifyPro.invalidSrcPath();
          return;
        }

        if (compileSrc.match(/^-+/)) return;

        watchSass(compileSrc, compileOutput);
        break;

      case '--import-path':
        if (importPathSrc.length === 0) {
          SassifyPro.invalidSrcPath();
          return;
        }

        importPath(compileSrc, importPathOutput, ...importPathSrc);
        break;

      case '--init':
        createSassifyproFile();
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
      args.forEach((arg, index) => {
        SassifyPro.parseArguments(arg as Options, args.slice(index + 1));
      });
    }
  }
}

/**
 * The run method of SassifyPro class.
 */
if (typeof require !== 'undefined' && require.main === module) {
  SassifyPro.sassifypro();
}

export const { sassifypro } = SassifyPro;
