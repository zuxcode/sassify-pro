import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

export default class CSSProcessor {
  public static postCSSProcessor(
    css: string,
    inputDir?: string,
    outputDir?: string,
  ) {
    return new Promise<postcss.Result>((resolve, reject) => {
      postcss([autoprefixer])
        .process(css, { from: inputDir, to: outputDir })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => reject(error));
    });
  }
}

export const { postCSSProcessor } = CSSProcessor;
