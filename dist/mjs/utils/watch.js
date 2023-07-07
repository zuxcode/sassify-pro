import browserSync from 'browser-sync';
import chokidar from 'chokidar';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { compileSass } from '../module/compiler.js';
export default class WatchMode {
    static watchSass(sourceDirectory, outputDirectory) {
        const browser = browserSync.create('Sassifypro server');
        const spinner = createSpinner();
        spinner.start({
            text: chalk.green('Starting Watch mode'),
        });
        const watcher = chokidar.watch(sourceDirectory, {
            ignored: /(^|[\\/\\])\../,
            persistent: true,
        });
        spinner.success({ text: chalk.green('Watch mode') });
        watcher.on('ready', () => {
            compileSass({ sourceFile: sourceDirectory, outputDirectory });
            spinner.success({ text: chalk.green('Compiled successfully \n') });
            browser.init({
                server: {
                    baseDir: outputDirectory ?? 'public',
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
            });
        });
        watcher.on('all', (event, path) => {
            function compileAndReload(file, output) {
                compileSass({ sourceFile: file, outputDirectory: output });
                spinner.success({
                    text: chalk.green(`File ${path} has been modified. Reloading the browser...`),
                });
                browser.reload();
                browser.notify('Reloading...', 5000);
            }
            switch (event) {
                case 'change':
                    spinner.success({
                        text: chalk.green(`File ${path} has been modified. Recompiling File\n`),
                    });
                    compileAndReload(path, outputDirectory);
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
                        text: chalk.yellow(`File ${path} has been removed. Recompiling File`),
                    });
                    compileAndReload(sourceDirectory, outputDirectory);
                    break;
                case 'unlinkDir':
                    spinner.success({
                        text: chalk.yellow(`Directory ${path} has been removed`),
                    });
                    compileAndReload(sourceDirectory, outputDirectory);
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
export const { watchSass } = WatchMode;
