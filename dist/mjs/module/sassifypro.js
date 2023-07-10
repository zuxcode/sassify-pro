#!/usr/bin/env node
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import { version, message } from '../cli/initialize.js';
import { compileSass } from './compiler.js';
import { watchSass } from '../utils/watch.js';
import { importPath } from '../utils/import-path.js';
export default class SassifyPro {
    static InvalidSrcPath() {
        createSpinner().error({
            text: chalk.red('Error: The "path" argument must be of type string. Received undefined'),
        });
    }
    static parser(flag, index, argv) {
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
                if (!compileSrc) {
                    compileSass({
                        sourceFile: compileSrc,
                        outputDirectory: compileOutput,
                    });
                    return;
                }
                if (compileSrc.match(/^-+/))
                    return;
                compileSass({
                    sourceFile: compileSrc,
                    outputDirectory: compileOutput,
                });
                break;
            case 'c':
                if (!compileSrc) {
                    SassifyPro.InvalidSrcPath();
                    return;
                }
                if (compileSrc.match(/^-+/))
                    return;
                compileSass({
                    sourceFile: compileSrc,
                    outputDirectory: compileOutput,
                });
                break;
            case 'watch':
                if (!compileSrc) {
                    SassifyPro.InvalidSrcPath();
                    return;
                }
                if (compileSrc.match(/^-+/))
                    return;
                watchSass(compileSrc, compileOutput);
                break;
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
