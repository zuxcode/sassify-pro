import browserSync, { Options as BrowserSyncOptions } from 'browser-sync';
import chokidar, { WatchOptions, FSWatcher } from 'chokidar';
import { green, red, yellow } from 'colorette';
import { createSpinner } from 'nanospinner';

import { compileSass } from '../module/compiler.js';

/**
 * Options specific to the Sassify Pro BrowserSync configuration.
 */
export interface SassifyProBrowserSyncOptions extends BrowserSyncOptions {}

/**
 * Represents the options specific to SassifyProChokidar.
 */
export interface SassifyProChokidarOptions extends WatchOptions {
  /**
   * The directories to watch for changes.
   */
  directories?: string[];

  /**
   * The file extensions to include when watching for changes.
   */
  extensions?: string[];
}

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
  public static watchSass(sassFilePath: string, cssOutputPath: string): void {
    const browser = browserSync.create('Sassifypro server');
    const spinner = createSpinner();

    const browserSyncOptions: SassifyProBrowserSyncOptions = {
      server: {
        baseDir: cssOutputPath ?? 'public',
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
      text: green('Starting Watch mode'),
    });

    const watcher: FSWatcher = chokidar.watch(sassFilePath, chokidarOptions);

    spinner.success({ text: green('Watch mode') });

    watcher.on('ready', () => {
      compileSass({ sassFilePath, cssOutputPath });
      spinner.success({ text: green('Compiled successfully \n') });

      browser.init(browserSyncOptions);
    });

    watcher.on('all', (event, path) => {
      function compileAndReload(file: string, output: string) {
        compileSass({ sassFilePath: file, cssOutputPath: output });
        spinner.success({
          text: green(
            `File ${path} has been modified. Reloading the browser...`,
          ),
        });
        browser.reload();
        browser.notify('Reloading...', 5000);
      }

      switch (event) {
        case 'change':
          spinner.success({
            text: green(`File ${path} has been modified. Recompiling File\n`),
          });
          compileAndReload(path, cssOutputPath);
          break;

        case 'add':
          spinner.success({
            text: green(`File ${path} has been added`),
          });
          break;

        case 'addDir':
          spinner.success({
            text: green(`Directory ${path} has been added`),
          });
          break;

        case 'unlink':
          spinner.success({
            text: yellow(`File ${path} has been removed. Recompiling File`),
          });
          compileAndReload(sassFilePath, cssOutputPath);
          break;

        case 'unlinkDir':
          spinner.success({
            text: yellow(`Directory ${path} has been removed`),
          });
          compileAndReload(sassFilePath, cssOutputPath);
          break;

        default:
          spinner.error({ text: red('Unknown Error occurred') });
          break;
      }
    });

    watcher.on('error', (error) => {
      spinner.error({ text: red(`Error:  ${error.message}`) });
      console.log(error);
    });
  }
}

/**
 * Shortcut for watching Sass files and enabling live reloading.
 */
export const { watchSass } = WatchMode;
