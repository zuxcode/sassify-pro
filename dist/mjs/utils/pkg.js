import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { readFileSync } from 'node:fs';
export default class PackageJson {
    static readPkg() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const mjsPath = path.parse(__dirname).dir;
        const distPath = path.parse(mjsPath).dir;
        const rootPath = path.parse(distPath).dir;
        const joinPkgPath = path.join(rootPath, 'package.json');
        const readPkg = readFileSync(joinPkgPath, { encoding: 'utf-8' });
        const pkg = JSON.parse(readPkg);
        return pkg;
    }
}
export const { readPkg } = PackageJson;
