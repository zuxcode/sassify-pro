import * as sass from 'sass';
import * as fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { matchFile } from './match-file.js';
import { readConfig } from '../config/read-config.js';
import { getConfig } from '../cli/sass-options.js';
export default class Compiler {
    static async preCompile(props) {
        const spinner = createSpinner();
        readConfig((err, data) => {
            if (err) {
                spinner.error({ text: chalk.red(err.message) });
                console.log('---------------------------------');
                console.log(err);
            }
            const sassOptions = { ...getConfig(), ...data, ...props };
            sass
                .compileAsync(sassOptions.sourceDir, sassOptions)
                .then(({ css, loadedUrls }) => {
                const isExist = fs.existsSync(sassOptions.outputDir);
                if (!isExist) {
                    fs.mkdirSync(sassOptions.outputDir, { recursive: true });
                }
                loadedUrls.forEach((url) => {
                    const fileName = path.basename(url.pathname);
                    if (!fileName.match(/^_/)) {
                        const renameFile = fileName.replace(/.s[ac]ss$/, '.css');
                        const joinFilePath = path.join(sassOptions.outputDir, renameFile);
                        fs.writeFileSync(joinFilePath, css);
                    }
                });
            });
        }).catch((err) => {
            spinner.error({ text: chalk.red(err) });
        });
    }
    static async compileSass(props) {
        const { sourceDir, outputDir, style, sourceMap, quietDeps, } = props;
        const { preCompile } = Compiler;
        const spinner = createSpinner();
        const srcPath = sourceDir ?? '';
        const resolvePath = path.join(process.cwd(), srcPath);
        const isExist = fs.existsSync(resolvePath);
        try {
            if (!isExist)
                throw new Error(` Cannot find file in ${resolvePath} directory`);
            const sourceFileStat = fs.statSync(resolvePath);
            if (sourceFileStat.isFile()) {
                preCompile({
                    sourceDir: resolvePath,
                    outputDir,
                    style,
                    sourceMap,
                    quietDeps,
                }).then(() => {
                    spinner.success({
                        text: `${chalk.green('File compiled successfully')}`,
                    });
                });
            }
            matchFile(resolvePath, (err, files) => {
                if (err) {
                    spinner.error({ text: chalk.red(err.message) });
                    console.log(err);
                }
                files.forEach((file) => {
                    preCompile({
                        sourceDir: file,
                        outputDir,
                        style,
                        sourceMap,
                        quietDeps,
                    }).then(() => {
                        spinner.success({
                            text: `${chalk.green('File compiled successfully')}`,
                        });
                    });
                });
            });
        }
        catch (error) {
            console.log(error);
            spinner.error({
                text: `${chalk.red(error)}`,
            });
        }
    }
}
export const { compileSass } = Compiler;
