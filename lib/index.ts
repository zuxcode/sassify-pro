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

type options =
  | 'compile'
  | 'c'
  | '--version'
  | '-v'
  | 'watch'
  | 'w'
  | '--source-map'
  | '-m'
  | '--import-path'
  | '-p'
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
    switch (flag) {
      case '--version':
        version();
        break;

      case '-v':
        version();
        break;

      case 'compile':
        if (!argv[index + 1]) {
          SassifyPro.InvalidSrcPath();
          return;
        }

        compileSass({
          sourceFile: argv[index + 1],
          outputDirectory: argv[index + 2],
        });
        break;

      case 'c':
        if (!argv[index + 1]) {
          SassifyPro.InvalidSrcPath();
          return;
        }

        compileSass({
          sourceFile: argv[index + 1],
          outputDirectory: argv[index + 2],
        });
        break;

      case 'watch':
        watchSass(argv[index + 1], argv[index + 2]);
        break;

      case 'w':
        watchSass(argv[index + 1], argv[index + 2]);
        break;

      default:
        if (flag.match(/-+/)) {
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
