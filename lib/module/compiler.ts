import * as sass from 'sass';
import * as fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

import { matchFile } from './match-file.js';
import { readConfig } from '../config/read-config.js';

interface CompilerInterFace {
  sourceFile: string;
  outputDirectory: string;
  style?: 'compressed' | 'expanded';
  sourceMap?: boolean;
  quietDeps?: boolean;
}

export default class Compiler {
  private static preCompile(props: CompilerInterFace) {
    const config = readConfig();

    const {
      sourceFile = props.sourceFile ?? config.sourceDir,
      outputDirectory = props.outputDirectory ?? config.outputDir,
      style = props.style ?? config.style,
      sourceMap = props.sourceMap ?? config.sourceMap,
      quietDeps = props.quietDeps ?? config.quietDeps,
    } = props;

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
            text: `${chalk.green(
              'Directory created successfully: ',
            )} ${outputDirectory}`,
          });
        }
        spinner.success({
          text: `${chalk.green('Writing ')} ${sourceFile}`,
        });
        fs.writeFileSync(joinFilePath, compileResult.css);
      });
    })();
  }

  public static compileSass(props: CompilerInterFace) {
    const {
      sourceFile, outputDirectory, style, sourceMap, quietDeps,
    } = props;

    const spinner = createSpinner();

    try {
      const srcPath = sourceFile ?? '';
      const resolvePath = path.join(process.cwd(), srcPath);
      const isExist = fs.existsSync(resolvePath);

      if (!isExist) throw new Error(`Error: Cannot find file ${resolvePath}`);

      const sourceFileStat = fs.statSync(resolvePath);

      let sassFiles: string[];

      if (sourceFileStat.isDirectory()) {
        sassFiles = [...matchFile(resolvePath)];
      }

      if (sourceFileStat.isFile()) {
        sassFiles = [...resolvePath];
      }

      sassFiles.forEach((sassFile) => {
        const sassFileStat = fs.statSync(resolvePath);

        if (sassFileStat.size === 0) {
          spinner.warn({
            text: `${chalk.yellow(
              'Compiling an empty sass file: ',
            )} ${resolvePath}`,
          });
        }

        Compiler.preCompile({
          sourceFile: sassFile,
          outputDirectory,
          style,
          sourceMap,
          quietDeps,
        });
      });
    } catch (error) {
      spinner.error({
        text: `${chalk.red(error.message)}`,
      });
    }
  }
}

export const { compileSass } = Compiler;
