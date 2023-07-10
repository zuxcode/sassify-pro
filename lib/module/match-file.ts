import fs from 'fs';
import glob from 'glob';
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';

export default class MatchFilePath {
  public static matchFile(
    sourcePattern?: string,
    excludePattern?: RegExp,
  ): string[] {
    const fileDependency: string[] = [];
    const srcDirectory = './src';

    const fileExtensionPattern = '.@(sass|scss)';

    const excludeRegex = excludePattern ?? /\/node_modules\/*\//;

    const globPattern = sourcePattern ?? `${srcDirectory}/**/*${fileExtensionPattern}`;

    const spinner = createSpinner().start({
      color: 'green',
      text: 'Retrieving Files',
    });

    glob(globPattern, { stat: true }, (err, files) => {
      if (err) {
        spinner.error({
          text: ` ${chalk.red('Error finding files:')} ${err}`,
        });

        return;
      }

      const filteredFiles = files.filter((file) => !excludeRegex.test(file));

      filteredFiles.forEach((file) => {
        fs.readFile(file, 'utf8', (error, data) => {
          if (error) {
            spinner.error({
              text: `${chalk.red('Error reading file:')} ${file} ${error}`,
            });

            return;
          }
          if (data.length > 0) {
            fileDependency.push(data);
            spinner.success({
              text: `${chalk.green('Loading')} ${file}`,
            });
          }
        });
      });
    });
    return fileDependency;
  }
}

export const { matchFile } = MatchFilePath;
