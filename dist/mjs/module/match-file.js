import glob from 'glob';
export default class MatchFilePath {
    static async matchFile(sourcePattern, cb, excludePattern) {
        const fileDependency = [];
        const fileExtensionPattern = '.@(sass|scss)';
        const excludeRegex = excludePattern ?? /\/node_modules\/*\//;
        const globPattern = `${sourcePattern}/**/*${fileExtensionPattern}`;
        return new Promise((resolve, reject) => {
            glob(globPattern, { stat: true }, (err, files) => {
                if (err)
                    reject(err);
                const filteredFiles = files.filter((file) => !excludeRegex.test(file));
                filteredFiles.forEach((file) => {
                    fileDependency.push(file);
                    resolve();
                });
            });
        })
            .then(() => cb(null, fileDependency))
            .catch((error) => cb(error, null));
    }
}
export const { matchFile } = MatchFilePath;
