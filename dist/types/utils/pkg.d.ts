import { pkgInterface } from '../@types/pkg.js';
export default class PackageJson {
    static readPkg(): pkgInterface;
}
export declare const readPkg: typeof PackageJson.readPkg;
