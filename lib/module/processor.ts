import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import path from 'path';
import { access, readFile } from 'fs/promises';
import { readAndUpdateConfig } from '../config/index.js';

export interface SassifyproAutoprefixerOption extends autoprefixer.Options {
  browserslist?: autoprefixer.Options;
}

/**
 * Represents the CSSProcessor class that performs post-processing of CSS using autoprefixer.
 */

export default class CSSProcessor {
  /**
   * Processes the CSS using autoprefixer and returns the result.
   * @param css - The CSS content to be processed.
   * @param inputDir - Optional. The input directory for the CSS file.
   * @param outputDir - Optional. The output directory for the processed CSS file.
   * @returns A Promise resolving to the postcss.Result object containing the processed CSS.
   * @throws Will throw an error if there is an issue with processing or accessing the
   * configuration files.
   */

  public static async postCSSProcessor(
    css: string,
    inputDir?: string,
    outputDir?: string,
  ): Promise<postcss.Result> {
    const currentWorkingDirectory = process.cwd();
    const browserslistrc = '.browserslistrc';
    const packageJson = 'package.json';

    const browserListPath = path.resolve(
      currentWorkingDirectory,
      browserslistrc,
    );
    const packageJsonPath = path.resolve(currentWorkingDirectory, packageJson);

    async function processor(opts: autoprefixer.Options) {
      try {
        const result = await postcss([autoprefixer(opts)]).process(css, {
          from: inputDir,
          to: outputDir,
        });
        return result;
      } catch (error) {
        throw new Error(error);
      }
    }

    async function readOptionsFromFile(
      file: string,
    ): Promise<SassifyproAutoprefixerOption> {
      try {
        const opts = await readFile(file, 'utf-8');
        const parseOpts: SassifyproAutoprefixerOption = JSON.parse(opts);
        return parseOpts;
      } catch (error) {
        throw new Error(error);
      }
    }

    try {
      await access(browserListPath);
      const options = await readOptionsFromFile(browserListPath);
      return processor(options);
    } catch {
      try {
        await access(packageJsonPath);
        const packageJsonOptions = await readOptionsFromFile(packageJsonPath);

        const sassifyproBrowserList = await readAndUpdateConfig();

        const options = packageJsonOptions.browserslist ?? sassifyproBrowserList;

        return processor(options);
      } catch (err) {
        throw new Error(err);
      }
    }
  }
}

export const { postCSSProcessor } = CSSProcessor;
