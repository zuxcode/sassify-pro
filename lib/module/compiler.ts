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
  private static async writeCSSFile(
    css: string,
    cssOutputPath: string,
    sassOptions: SassOptions,
    loadedUrls: URL[],
  ) {
    const getFile = async (url: URL) => {
      const fileName = path.basename(url.pathname);

      if (!fileName.match(/^_/)) {
        const renameFile = fileName.replace(/.s[ac]ss$/, '.css');
        const joinFilePath = path.join(cssOutputPath, renameFile);

        if (sassOptions.autoprefixer) {
          try {
            const processed = await postCSSProcessor(css);
            await writeFile(joinFilePath, processed.css);
          } catch (err) {
            throw err;
          }
        } else {
          await writeFile(joinFilePath, css);
        }
      }
    };

    loadedUrls.forEach(getFile);
  }

  private static async createOutputDir(
    css: string,
    cssOutputPath: string,
    sassOptions: SassOptions,
    loadedUrls: URL[],
  ) {
    try {
      await mkdir(cssOutputPath, { recursive: true });
      await Compiler.writeCSSFile(css, cssOutputPath, sassOptions, loadedUrls);
    } catch (error) {
      throw error;
    }
  }

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

      const { cssOutputPath, sassFilePath } = sassOptions;

      const { css, loadedUrls } = await sass.compileAsync(
        sassFilePath,
        sassOptions,
      );

      try {
        await access(cssOutputPath);
        await Compiler.writeCSSFile(
          css,
          cssOutputPath,
          sassOptions,
          loadedUrls,
        );
      } catch (error) {
        await Compiler.createOutputDir(
          css,
          cssOutputPath,
          sassOptions,
          loadedUrls,
        );
      }
    } catch (error) {
      spinner.error({ text: red(error) });
    }
  }

  public static async compileSass(props: SassOptions) {
    const {
      sassFilePath, cssOutputPath, style, sourceMap, quietDeps,
    } = props;

    const spinner = createSpinner();
    const srcPath = sassFilePath ?? '';

    const resolvePath = path.resolve(process.cwd(), srcPath);

    try {
      const sourceFileStat = await stat(resolvePath);

      if (sourceFileStat.isFile()) {
        await Compiler.preCompile({
          sassFilePath: resolvePath,
          cssOutputPath,
          style,
          sourceMap,
          quietDeps,
        });

        spinner.success({
          text: green(`File ${resolvePath} compiled successfully`),
        });
      } else {
        const files = await matchFile(resolvePath);
        files.forEach((file) => {
          Compiler.preCompile({
            sassFilePath: file,
            cssOutputPath,
            style,
            sourceMap,
            quietDeps,
          }).then(() => {
            spinner.success({
              text: green(`File ${file} compiled successfully`),
            });
          });
        });
      }
    } catch (error) {
      spinner.error({ text: red(error.message) });
    }
  }
}

export const { compileSass } = Compiler;
