import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

import { readAndUpdateConfig } from '../config/read-and-update-config.js';

export interface SassifyproAutoprefixerOption extends autoprefixer.Options {}

export default class CSSProcessor {
  public static postCSSProcessor(
    css: string,
    inputDir?: string,
    outputDir?: string,
  ) {
    return new Promise<postcss.Result>((resolve, reject) => {
      readAndUpdateConfig()
        .then((config) => {
          postcss([autoprefixer(config)])
            .process(css, { from: inputDir, to: outputDir })
            .then((result) => {
              resolve(result);
            })
            .catch((error) => reject(error));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export const { postCSSProcessor } = CSSProcessor;
