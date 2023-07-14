import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { readFileSync } from 'node:fs';

import { Package } from '../@types/package.js';

/**
 * Utility class for reading the package.json file.
 */
export default class PackageJson {
  /**
   * Reads the package.json file and returns its parsed content as a {@link Package} object.
   *
   * @returns The parsed package.json content as a {@link Package} object.
   */
  public static readPackage(): Package {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const rootPath = path.resolve(__dirname, '..', '..', '..');
    const packageJsonPath = path.join(rootPath, 'package.json');
    const pkgContent = readFileSync(packageJsonPath, { encoding: 'utf-8' });
    const packageJson: Package = JSON.parse(pkgContent);
    return packageJson;
  }
}

/**
 * Shortcut for reading the package.json file and returning its parsed
 * content as a {@link Package} object.
 *
 * @returns The parsed package.json content as a {@link Package} object.
 */
export const { readPackage } = PackageJson;
