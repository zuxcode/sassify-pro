import glob from 'glob';
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
export default class MatchFilePath {
    static matchFile(sourcePattern, excludePattern) {
        const fileDependency = [];
        const fileExtensionPattern = '.@(sass|scss)';
        const excludeRegex = excludePattern ?? /\/node_modules\/*\//;
        const globPattern = `${sourcePattern}/**/*${fileExtensionPattern}`;
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
                fileDependency.push(file);
                spinner.success({
                    text: `${chalk.green('Loading')} ${file}`,
                });
            });
        });
        return fileDependency;
    }
}
export const { matchFile } = MatchFilePath;
