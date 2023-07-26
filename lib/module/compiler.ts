import * as sass from 'sass';
import {
  access, mkdir, writeFile, stat,
} from 'fs/promises';
import path from 'node:path';
import { green, red } from 'colorette';
import { createSpinner } from 'nanospinner';

import { matchFile } from './match-file.js';
import { readAndUpdateConfig } from '../config/index.js';
import { SassOptions } from '../@types/index.js';
import { postCSSProcessor } from './processor.js';

export default class Compiler {
  private static async preCompile(props: SassOptions): Promise<void> {
    const spinner = createSpinner();
    try {
      const sassifyproConfig = await readAndUpdateConfig();

      const sanitizedProps = { ...props };

      Object.keys(sanitizedProps).forEach((key) => {
        if (typeof sanitizedProps[key] === 'undefined') {
          delete sanitizedProps[key];
        }
      });

      const sassOptions = { ...sassifyproConfig, ...sanitizedProps };

      const { sassFilePath, cssOutputPath } = sassOptions;

      const { css, loadedUrls } = await sass.compileAsync(
        sassFilePath,
        sassOptions,
      );

      const writeCSSFile = () => {
        const getFile = async (url: URL) => {
          const fileName = path.basename(url.pathname);

          if (!fileName.match(/^_/)) {
            const renameFile = fileName.replace(/.s[ac]ss$/, '.css');
            const joinFilePath = path.join(cssOutputPath, renameFile);

            if (sassOptions.autoprefixer) {
              postCSSProcessor(css)
                .then((processed) => {
                  writeFile(joinFilePath, processed.css);
                })
                .catch((err) => {
                  throw new Error(err);
                });
            } else {
              writeFile(joinFilePath, css);
            }
          }
        };

        loadedUrls.forEach(getFile);
      };

      const createOutputDir = () => {
        mkdir(cssOutputPath, { recursive: true }).then(writeCSSFile);
      };

      access(cssOutputPath).then(writeCSSFile).catch(createOutputDir);
    } catch (error) {
      spinner.error({ text: red(error) });
    }
  }

  public static compileSass(props: SassOptions) {
    const {
      sassFilePath, cssOutputPath, style, sourceMap, quietDeps,
    } = props;

    const { preCompile } = Compiler;

    const spinner = createSpinner();
    const srcPath = sassFilePath ?? '';

    const currentWorkingDirectory = process.cwd();

    const resolvePath = path.join(currentWorkingDirectory, srcPath);

    function compile(file?: string) {
      preCompile({
        sassFilePath: file ?? resolvePath,
        cssOutputPath,
        style,
        sourceMap,
        quietDeps,
      }).then(() => {
        spinner.success({
          text: green(`File ${file ?? resolvePath} compiled successfully`),
        });
      });
    }

    async function callCompiler() {
      try {
        const sourceFileStat = await stat(resolvePath);
        if (sourceFileStat.isFile()) {
          compile();

          return;
        }

        const matchFileCallBack = (error: Error, files: string[]) => {
          if (error) {
            spinner.error({ text: red(error.message) });

            console.log(error);

            return;
          }

          files.forEach((file) => compile(file));
        };

        matchFile(resolvePath, matchFileCallBack);
      } catch (error) {
        console.log(error);
      }
    }
    access(resolvePath)
      .finally(callCompiler)
      .catch(() => {
        console.log(red(`Error: No such file or directory as ${resolvePath}`));
      });
  }
}

export const { compileSass } = Compiler;
