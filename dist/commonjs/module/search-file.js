import path from 'node:path';
import * as fs from 'node:fs';
import ExcludeFile from './exclude-file.js';
export default class SearchFile {
    static searchFile(sourcePath, excludePath) {
        const matchWhiteSpaceEmptyString = /^$|\s+/;
        const childStackDirectoryDependency = [];
        const fileDependency = [];
        let pathName = '';
        const isInvalidPath = (filePath) => matchWhiteSpaceEmptyString.test(filePath);
        if (isInvalidPath(sourcePath)) {
            throw new Error('Invalid file. sourceDir cannot contain white space or empty string');
        }
        const stack = fs.readdirSync(sourcePath);
        stack.forEach((currentStack) => {
            const stackFullPath = path.join(sourcePath, currentStack);
            const exclude = ExcludeFile.excludeFile(excludePath, stackFullPath);
            exclude.forEach((childStackFile) => {
                const stackFullPathStat = fs.statSync(childStackFile);
                if (stackFullPathStat.isDirectory()) {
                    const childStackDirectory = fs.readdirSync(childStackFile);
                    childStackDirectoryDependency.push(...childStackDirectory);
                    pathName = stackFullPath;
                }
                else if (stackFullPath.match(/.s[ac]ss$/)) {
                    fileDependency.push(stackFullPath);
                }
                while (childStackDirectoryDependency.length > 0) {
                    const childStack = childStackDirectoryDependency.pop();
                    const childStackPath = path.join(pathName, childStack);
                    const childStackFullPathStat = fs.statSync(childStackPath);
                    if (childStackFullPathStat.isDirectory()) {
                        const childStackDirectory = fs.readdirSync(childStackPath);
                        childStackDirectoryDependency.push(...childStackDirectory);
                        pathName = childStackPath;
                    }
                    else if (childStackPath.match(/.s[ac]ss$/)) {
                        fileDependency.push(childStackPath);
                    }
                }
            });
        });
        return fileDependency;
    }
}
