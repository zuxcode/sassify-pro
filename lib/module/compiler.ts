import * as sass from 'sass';
import * as fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

interface CompilerInterFace {
  sourceFile: string;
  outputDirectory: string;
  style?: 'compressed' | 'expanded';
  sourceMap?: boolean;
  quietDeps?: boolean;
}

export default class Compiler {
  private static preCompile(props: CompilerInterFace) {
    const {
      sourceFile = props.sourceFile ?? '.',
      outputDirectory = props.outputDirectory ?? 'public',
      style = props.style ?? 'expanded',
      sourceMap = true,
      quietDeps = true,
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
        setTimeout(() => {
          spinner.success({
            text: `${chalk.green('Writing ')} ${sourceFile}`,
          });
        }, 1000);
        fs.writeFileSync(joinFilePath, compileResult.css);
      });
    })();
  }

  public static compileSass(props: CompilerInterFace) {
    const {
      sourceFile,
      outputDirectory = props.outputDirectory ?? 'public',
      style = props.style ?? 'expanded',
      sourceMap = true,
      quietDeps = true,
    } = props;

    const spinner = createSpinner();

    const searchWhiteSpaceEmptyString = /^$|\s+/;

    const isValidPath = (filePath: string): boolean => !searchWhiteSpaceEmptyString.test(filePath);

    try {
      const resolvePath = path.resolve(process.cwd(), sourceFile);
      const isValidSourceFile = isValidPath(sourceFile);
      const isExist = fs.existsSync(sourceFile);

      if (!sourceFile) throw new Error(`Error: Cannot find file ${resolvePath}`);

      if (!isValidSourceFile) throw new Error(`Error: Cannot find file ${resolvePath}`);

      if (!isExist) throw new Error(`Error: Cannot find file ${resolvePath}`);

      const sourceFileStat = fs.statSync(sourceFile);

      if (sourceFileStat.isDirectory()) throw new Error(`Error: Cannot find file ${resolvePath}`);

      if (sourceFileStat.size === 0) {
        setTimeout(() => {
          spinner.warn({
            text: `${chalk.yellow('Compiling an empty file: ')} ${resolvePath}`,
          });
        }, 1000);
      }

      Compiler.preCompile({
        sourceFile,
        outputDirectory,
        style,
        sourceMap,
        quietDeps,
      });
    } catch (error) {
      spinner.error({
        text: `${chalk.red(error.message)}`,
      });
    }
  }
}

export const { compileSass } = Compiler;
