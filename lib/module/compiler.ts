import * as sass from 'sass';
import * as fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

import { matchFile } from './match-file.js';
import { readAndUpdateConfig } from '../config/read-and-update-config.js';
import { SassOptions } from '../@types/sass-options.js';

export default class Compiler {
  private static async preCompile(props: SassOptions) {
    const spinner = createSpinner();
    try {
      const config = await readAndUpdateConfig();

      const sanitizedProps = { ...props };

      Object.keys(sanitizedProps).forEach((key) => {
        if (typeof sanitizedProps[key] === 'undefined') {
          delete sanitizedProps[key];
        }
      });

      const sassOptions = { ...config, ...sanitizedProps };
      const { sourceDir, outputDir } = sassOptions;
      const { css, loadedUrls } = await sass.compileAsync(
        sourceDir,
        sassOptions,
      );

      const isOutputDirExist = fs.existsSync(outputDir);

      if (!isOutputDirExist) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      loadedUrls.forEach((url) => {
        const fileName = path.basename(url.pathname);

        if (!fileName.match(/^_/)) {
          const renameFile = fileName.replace(/.s[ac]ss$/, '.css');
          const joinFilePath = path.join(outputDir, renameFile);

          fs.writeFileSync(joinFilePath, css);
        }
      });

      return true;
    } catch (error) {
      spinner.error({ text: chalk.red(error) });
      return false;
    }
  }

  public static async compileSass(props: SassOptions) {
    const {
      sourceDir, outputDir, style, sourceMap, quietDeps,
    } = props;

    const spinner = createSpinner();
    const srcPath = sourceDir ?? '';
    const resolvePath = path.join(process.cwd(), srcPath);
    const isExist = fs.existsSync(resolvePath);

    try {
      if (!isExist) {
        throw new Error(`Cannot find file in ${resolvePath} directory`);
      }

      const sourceFileStat = fs.statSync(resolvePath);

      if (sourceFileStat.isFile()) {
        await Compiler.preCompile({
          sourceDir: resolvePath,
          outputDir,
          style,
          sourceMap,
          quietDeps,
        });
        spinner.success({
          text: `${chalk.green('File compiled successfully')}`,
        });
      } else {
        matchFile(resolvePath, async (err, files) => {
          if (err) {
            spinner.error({ text: chalk.red(err.message) });
            console.log(err);
          } else {
            files.forEach(async (file) => {
              await Compiler.preCompile({
                sourceDir: file,
                outputDir,
                style,
                sourceMap,
                quietDeps,
              });
            });
            spinner.success({
              text: `${chalk.green('File compiled successfully')}`,
            });
          }
        });
      }
    } catch (error) {
      spinner.error({
        text: `${chalk.red(error)}`,
      });
      console.log(error);
    }
  }
}

export const { compileSass } = Compiler;
