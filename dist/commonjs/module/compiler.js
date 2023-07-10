import * as sass from 'sass';
import * as fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { matchFile } from './match-file.js';
export default class Compiler {
    static preCompile(props) {
        const { sourceFile = props.sourceFile ?? process.cwd(), outputDirectory = props.outputDirectory ?? 'public', style = props.style ?? 'expanded', sourceMap = props.sourceMap ?? true, quietDeps = props.quietDeps ?? true, } = props;
        const spinner = createSpinner().start({
            color: 'green',
            text: 'Starting Compilation\n',
        });
        (async () => {
            const compileResult = await sass.compileAsync(sourceFile, {
                alertAscii: true,
                alertColor: true,
                charset: true,
                quietDeps,
                sourceMap,
                style,
            });
            const { loadedUrls } = compileResult;
            const isOutDirExist = fs.existsSync(outputDirectory);
            loadedUrls.forEach((url) => {
                const fileName = path.basename(url.pathname);
                const renameFile = fileName.replace(/.s[ac]ss$/, '.css');
                const joinFilePath = path.join(outputDirectory, renameFile);
                if (!isOutDirExist) {
                    fs.mkdirSync(outputDirectory, { recursive: true });
                    spinner.success({
                        text: `${chalk.green('Directory created successfully: ')} ${outputDirectory}`,
                    });
                }
                setTimeout(() => {
                    spinner.success({
                        text: `${chalk.green('Writing ')} ${sourceFile}`,
                    });
                }, 1000);
                fs.writeFileSync(joinFilePath, compileResult.css);
            });
        })();
    }
    static compileSass(props) {
        const { sourceFile, outputDirectory, style, sourceMap, quietDeps, } = props;
        const spinner = createSpinner();
        try {
            const srcPath = sourceFile ?? '';
            const resolvePath = path.resolve(process.cwd(), srcPath);
            const isExist = fs.existsSync(srcPath);
            if (!isExist)
                throw new Error(`Error: Cannot find file ${resolvePath}`);
            const sourceFileStat = fs.statSync(srcPath);
            if (sourceFileStat.size === 0) {
                setTimeout(() => {
                    spinner.warn({
                        text: `${chalk.yellow('Compiling an empty sass file: ')} ${resolvePath}`,
                    });
                }, 1000);
            }
            if (sourceFileStat.isFile()) {
                Compiler.preCompile({
                    sourceFile: srcPath,
                    outputDirectory,
                    style,
                    sourceMap,
                    quietDeps,
                });
            }
            const SassFiles = matchFile(srcPath);
            SassFiles.forEach((sassFile) => {
                Compiler.preCompile({
                    sourceFile: sassFile,
                    outputDirectory,
                    style,
                    sourceMap,
                    quietDeps,
                });
            });
        }
        catch (error) {
            spinner.error({
                text: `${chalk.red(error.message)}`,
            });
        }
    }
}
export const { compileSass } = Compiler;
