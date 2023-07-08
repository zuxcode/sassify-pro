#!/usr/bin/env node

/**
 * @package SassifyPro
 *
 *  SassifyPro is a powerful Sass/SCSS compiler designed to streamline your CSS
 * development process by compiling Sass/SCSS (Syntactically Awesome Style Sheets) into efficient
 * and browser-compatible CSS code. It provides an intuitive command-line interface and a wide
 * range of features to enhance your productivity and maintainability.
 *
 * @author codeauthor1 <codeauthor2000@gmail.com> (https://www.twitter.com/codeathor1)
 *
 */

import { createSpinner } from 'nanospinner';
import chalk from 'chalk';

import { version, message } from './cli/initialize.js';
import { compileSass } from './module/compiler.js';
import { watchSass } from './utils/watch.js';
import { importPath } from './utils/import-path.js';

type options =
  | 'compile'
  | 'c'
  | '--version'
  | '-v'
  | 'watch'
  | 'w'
  | '--source-map'
  | '-S'
  | '--import-path'
  | '-i'
  | '--style'
  | '-s'
  | '--autoprefixer'
  | '-a';

export default class SassifyPro {
  private static InvalidSrcPath() {
    createSpinner().error({
      text: chalk.red(
        'Error: The "path" argument must be of type string. Received undefined',
      ),
    });
  }

  private static parser(flag?: options, index?: number, argv?: string[]) {
    const compileSrc = argv[index + 1];
    const compileOutput = argv[index + 2];
    const importPathOutput = argv[argv.length - 1];
    const importPathSrc = argv.slice(3, argv.length - 1);

    switch (flag) {
      case '--version':
        version();
        break;

      case '-v':
        version();
        break;

      case 'compile':
        if (compileSrc.match(/^-+/)) return;

        compileSass({
          sourceFile: compileSrc,
          outputDirectory: compileOutput,
        });
        break;

      case 'c':
        if (compileSrc.match(/^-+/)) return;

        compileSass({
          sourceFile: compileSrc,
          outputDirectory: compileOutput,
        });
        break;

      case 'watch':
        if (compileSrc.match(/^-+/)) return;

        watchSass(compileSrc, compileOutput);
        break;

      case 'w':
        if (compileSrc.match(/^-+/)) return;

        watchSass(compileSrc, compileOutput);
        break;

      case '--import-path':
        if (!importPathSrc) {
          SassifyPro.InvalidSrcPath();
        }

        if (importPathSrc.length === 0) {
          SassifyPro.InvalidSrcPath();
        }

        importPath(compileSrc, importPathOutput, ...importPathSrc);
        break;

      case '-i':
        if (!importPathSrc) {
          SassifyPro.InvalidSrcPath();
        }

        if (importPathSrc.length === 0) {
          SassifyPro.InvalidSrcPath();
        }

        importPath(compileSrc, importPathOutput, ...importPathSrc);
        break;

      default:
        if (flag.match(/^-+/)) {
          createSpinner().error({
            text: chalk.red(`bad option: ${flag}`),
          });
          break;
        }
    }
  }

  public static run() {
    if (process.argv.length <= 2) {
      message();
    } else {
      const sliceArg = process.argv.slice(2);

      sliceArg.find(SassifyPro.parser);
    }
  }
}

export const { run } = SassifyPro;
