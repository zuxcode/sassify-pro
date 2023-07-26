import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import path from 'path';
import { access, readFile } from 'fs/promises';
import { readAndUpdateConfig } from '../config/index.js';

export interface SassifyproAutoprefixerOption extends autoprefixer.Options {
  kind?: 'browserslistrc';
}

interface SassifyProBrowserslist {
  browserslist: autoprefixer.Options;
  kind?: 'browserslist';
}

type ProcessorOption = SassifyProBrowserslist | SassifyproAutoprefixerOption;

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

    async function readOptionsFromFile(file: string): Promise<ProcessorOption> {
      try {
        const opts = await readFile(file, 'utf-8');
        const parseOpts: ProcessorOption = JSON.parse(opts);
        return parseOpts;
      } catch (error) {
        throw new Error(error);
      }
    }

    try {
      await access(browserListPath);
      const options = await readOptionsFromFile(browserListPath);

      if (options.kind === 'browserslist') return;
      processor(options);
    } catch {
      try {
        await access(packageJsonPath);
        const options = await readOptionsFromFile(packageJsonPath);
        if (options.kind === 'browserslistrc') return;
        processor(options.browserslist);
      } catch {
        try {
          const opts = await readAndUpdateConfig();
          processor(opts);
        } catch (err) {
          throw new Error(err);
        }
      }
    }
  }
}

export const { postCSSProcessor } = CSSProcessor;
