import browserSync, { Options as BrowserSyncOptions } from 'browser-sync';
import chokidar, { WatchOptions, FSWatcher } from 'chokidar';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

import { compileSass } from '../module/compiler.js';

interface SassifyProBrowserSyncOptions extends BrowserSyncOptions {}
interface SassifyProChokidarOptions extends WatchOptions {}

/**
 * Class for managing the watch mode and live reloading of Sass files.
 */
export default class WatchMode {
  /**
   * Watches the Sass source directory for changes and compiles the Sass files.
   * It also starts a local server and enables live reloading using BrowserSync.
   *
   * @param sourceDirectory - The source directory containing Sass files to watch.
   * @param outputDir - The output directory for the compiled CSS files.
   */
  public static watchSass(sourceDirectory: string, outputDir: string): void {
    const browser = browserSync.create('Sassifypro server');
    const spinner = createSpinner();

    const browserSyncOptions: SassifyProBrowserSyncOptions = {
      server: {
        baseDir: outputDir ?? 'public',
        serveStaticOptions: {
          extensions: ['html'],
        },
      },
      ui: {
        port: 6000,
        weinre: {
          port: 8080,
        },
      },
      open: 'local',
      port: 3000,
    };

    const chokidarOptions: SassifyProChokidarOptions = {
      persistent: true,
      ignored: /(^|[\\/\\])\../,
    };

    spinner.start({
      text: chalk.green('Starting Watch mode'),
    });

    const watcher: FSWatcher = chokidar.watch(sourceDirectory, chokidarOptions);

    spinner.success({ text: chalk.green('Watch mode') });

    watcher.on('ready', () => {
      compileSass({ sourceDir: sourceDirectory, outputDir });
      spinner.success({ text: chalk.green('Compiled successfully \n') });

      browser.init(browserSyncOptions);
    });

    watcher.on('all', (event, path) => {
      function compileAndReload(file: string, output: string) {
        compileSass({ sourceDir: file, outputDir: output });
        spinner.success({
          text: chalk.green(
            `File ${path} has been modified. Reloading the browser...`,
          ),
        });
        browser.reload();
        browser.notify('Reloading...', 5000);
      }

      switch (event) {
        case 'change':
          spinner.success({
            text: chalk.green(
              `File ${path} has been modified. Recompiling File\n`,
            ),
          });
          compileAndReload(path, outputDir);
          break;

        case 'add':
          spinner.success({
            text: chalk.green(`File ${path} has been added`),
          });
          break;

        case 'addDir':
          spinner.success({
            text: chalk.green(`Directory ${path} has been added`),
          });
          break;

        case 'unlink':
          spinner.success({
            text: chalk.yellow(
              `File ${path} has been removed. Recompiling File`,
            ),
          });
          compileAndReload(sourceDirectory, outputDir);
          break;

        case 'unlinkDir':
          spinner.success({
            text: chalk.yellow(`Directory ${path} has been removed`),
          });
          compileAndReload(sourceDirectory, outputDir);
          break;

        default:
          spinner.error({ text: chalk.red('Unknown Error occurred') });
          break;
      }
    });

    watcher.on('error', (error) => {
      spinner.error({ text: chalk.red('Error: ', error.message, error) });
    });
  }
}

/**
 * Shortcut for watching Sass files and enabling live reloading.
 */
export const { watchSass } = WatchMode;
