export default class ExcludeFile {
    static excludeFile(excludedFile, sourcePath) {
        const fileDependency = [];
        const isEmptyPath = excludedFile.length === 0;
        if (isEmptyPath)
            fileDependency.push(sourcePath);
        else {
            const matchWhiteSpaceEmptyString = /^$|\s+/;
            const isInvalidPath = (path) => matchWhiteSpaceEmptyString.test(path);
            excludedFile.forEach((file) => {
                if (isInvalidPath(file)) {
                    console.log(`${file}Empty path`);
                    fileDependency.push(sourcePath);
                }
                else {
                    if (!file.match(sourcePath)) {
                        fileDependency.push(sourcePath);
                    }
                    if (file.match(sourcePath)) {
                        console.log('Excluding file from compilation');
                    }
                }
            });
        }
        return fileDependency;
    }
}
