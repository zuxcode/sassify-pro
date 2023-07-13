import path from 'node:path';
import { compileSass } from '../module/compiler.js';
export default class ImportPath {
    static importPath(rootPath, outputPath, ...arg) {
        arg.forEach((file) => {
            const jointFilePath = path.join(rootPath, file);
            compileSass({ sourceDir: jointFilePath, outputDir: outputPath });
        });
    }
}
export const { importPath } = ImportPath;
