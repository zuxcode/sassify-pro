#!/usr/bin/env node
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import { version, message } from './cli/initialize.js';
import { compileSass } from './module/compiler.js';
import { watchSass } from './utils/watch.js';
export default class SassifyPro {
    static InvalidSrcPath() {
        createSpinner().error({
            text: chalk.red('Error: The "path" argument must be of type string. Received undefined'),
        });
    }
    static parser(flag, index, argv) {
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
    static run() {
        if (process.argv.length <= 2) {
            message();
        }
        else {
            const sliceArg = process.argv.slice(2);
            sliceArg.find(SassifyPro.parser);
        }
    }
}
export const { run } = SassifyPro;
