import * as sass from 'sass';
import * as fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { matchFile } from './match-file.js';
import { readConfig } from '../config/read-config.js';
export default class Compiler {
    static async preCompile(props) {
        const spinner = createSpinner();
        readConfig((err, data) => {
            if (err)
                console.log(err);
            const { sourceFile = props.sourceFile ?? data.sourceDir, style = props.style ?? data.style, sourceMp = props.sourceMp ?? data.sourceMap, quietDeps = props.quietDeps ?? data.quietDeps, outputDirectory = props.outputDirectory ?? data.outputDir, } = props;
            sass
                .compileAsync(sourceFile, {
                alertAscii: true,
                alertColor: true,
                charset: true,
                quietDeps,
                sourceMap: sourceMp,
                style,
            })
                .then(({ css, loadedUrls, sourceMap }) => {
                const isExist = fs.existsSync(outputDirectory);
                if (!isExist) {
                    fs.mkdirSync(outputDirectory, { recursive: true });
                }
                loadedUrls.forEach((url) => {
                    const fileName = path.basename(url.pathname);
                    const renameFile = fileName.replace(/.s[ac]ss$/, '.css');
                    const joinFilePath = path.join(outputDirectory, renameFile);
                    fs.writeFileSync(joinFilePath, css);
                });
                console.log(sourceMap);
            });
        });
        spinner.success({
            text: `${chalk.green('File compiled successfully')}`,
        });
    }
    static async compileSass(props) {
        const { sourceFile, outputDirectory, style, sourceMp, quietDeps, } = props;
        const { preCompile } = Compiler;
        const spinner = createSpinner();
        try {
            const srcPath = sourceFile ?? '';
            const resolvePath = path.join(process.cwd(), srcPath);
            const isExist = fs.existsSync(resolvePath);
            if (!isExist)
                throw new Error(`Error: Cannot find file ${resolvePath}`);
            const sourceFileStat = fs.statSync(resolvePath);
            if (sourceFileStat.isFile()) {
                preCompile({
                    sourceFile: resolvePath,
                    outputDirectory,
                    style,
                    sourceMp,
                    quietDeps,
                });
            }
            matchFile(resolvePath, (err, files) => {
                if (err)
                    console.log(err);
                files.forEach((file) => {
                    preCompile({
                        sourceFile: file,
                        outputDirectory,
                        style,
                        sourceMp,
                        quietDeps,
                    });
                });
            });
        }
        catch (error) {
            spinner.error({
                text: `${chalk.red(error.message)}`,
            });
            console.log(error);
        }
    }
}
export const { compileSass } = Compiler;
