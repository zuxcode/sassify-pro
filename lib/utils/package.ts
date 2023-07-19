import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { readFile } from 'fs/promises';

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

  public static async readPackage(): Promise<Package> {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const moduleRoot = path.resolve(__dirname, '..', 'package.json');
      const packageMetaData = await readFile(moduleRoot, { encoding: 'utf-8' });
      const parseMetaData: Package = JSON.parse(packageMetaData);
      return parseMetaData;
    } catch (error) {
      const moduleRoot = path.resolve(__dirname, '..', 'package.json');
      const packageMetaData = await readFile(moduleRoot, { encoding: 'utf-8' });
      const parseMetaData: Package = JSON.parse(packageMetaData);
      return parseMetaData;
    }
  }
}

/**
 * Shortcut for reading the package.json file and returning its parsed
 * content as a {@link Package} object.
 *
 * @returns The parsed package.json content as a {@link Package} object.
 */
export const { readPackage } = PackageJson;
