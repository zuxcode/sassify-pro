/* eslint-disable no-unused-vars */
import glob from 'glob';

export default class MatchFilePath {
  public static async matchFile(
    sourcePattern: string,
    cb: (error: Error, result: string[]) => void,
    excludePattern?: RegExp,
  ): Promise<void> {
    const fileDependency: string[] = [];

    const fileExtensionPattern = '.@(sass|scss)';

    const excludeRegex = excludePattern ?? /\/node_modules\/*\//;

    const globPattern = `${sourcePattern}/**/*${fileExtensionPattern}`;

    return new Promise((resolve, reject) => {
      glob(globPattern, { stat: true }, (err, files) => {
        if (err) reject(err);

        const filteredFiles = files.filter((file) => !excludeRegex.test(file));

        filteredFiles.forEach((file) => {
          fileDependency.push(file);
          resolve(fileDependency);
        });
      });
    })
      .then((result: string[]) => cb(null, result))
      .catch((error) => cb(error, null));
  }
}

export const { matchFile } = MatchFilePath;
