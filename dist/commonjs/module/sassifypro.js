#!/usr/bin/env node
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import { compileSass } from './compiler.js';
import { watchSass } from '../utils/watch.js';
import { importPath } from '../utils/import-path.js';
import { version, message, sassifyproInit } from '../cli/initialize.js';
export default class SassifyPro {
    static InvalidSrcPath() {
        createSpinner().error({
            text: chalk.red('Error: The "path" argument must be of type string. Received undefined'),
        });
    }
    static parseArguments(flag, index, argv) {
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
                        sourceDir: compileSrc,
                        outputDir: compileOutput,
                    });
                    return;
                }
                if (compileSrc.match(/^-+/))
                    return;
                compileSass({
                    sourceDir: compileSrc,
                    outputDir: compileOutput,
                });
                break;
            case 'watch':
            case 'w':
                if (!compileSrc) {
                    SassifyPro.InvalidSrcPath();
                    return;
                }
                if (compileSrc.match(/^-+/))
                    return;
                watchSass(compileSrc, compileOutput);
                break;
            case '--import-path':
            case '-i':
                if (!importPathSrc || importPathSrc.length === 0) {
                    SassifyPro.InvalidSrcPath();
                    return;
                }
                importPath(compileSrc, importPathOutput, ...importPathSrc);
                break;
            case '--init':
                sassifyproInit();
                break;
            default:
                if (flag.match(/^-+/)) {
                    createSpinner().error({
                        text: chalk.red(`bad option: ${flag}`),
                    });
                }
                break;
        }
    }
    static run() {
        if (process.argv.length <= 2) {
            message();
        }
        else {
            const args = process.argv.slice(2);
            args.find(SassifyPro.parseArguments);
        }
    }
}
export const { run } = SassifyPro;
