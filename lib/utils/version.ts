import path from 'node:path';
import { readFile } from 'fs/promises';

import { Package } from '../@types/package.js';
import { readPackage } from './package.js';

export default class Version {
  public static async checkModuleVersion() {
    const modulePath = path.resolve(process.cwd(), 'package.json');

    try {
      const packageJson = await readFile(modulePath, 'utf-8');

      const parsePackageJson: Package = JSON.parse(packageJson);

      const supportedVersion = '1.0.3';

      const unsupportedVersion = parsePackageJson.dependencies['sassify-pro']
        || parsePackageJson.devDependencies['sassify-pro']
        || parsePackageJson.peerDependencies['sassify-pro'];

      if (
        unsupportedVersion < supportedVersion
        || unsupportedVersion < supportedVersion
        || unsupportedVersion < supportedVersion
      ) {
        throw new Error(`
        Error: Module Testing Notice
        
        The current version of this module (${unsupportedVersion}) was intended for testing purposes and may 
        contain known bugs or issues. We strongly recommend installing the latest version or a version higher
        than ${unsupportedVersion} for improved stability and bug fixes.
        
        To install the latest version, please run the following command:
        
        npm install ${readPackage().name}@latest
        
        If you prefer to install a version higher than 1.0.2, you can specify the desired version explicitly:
        
        npm install ${readPackage().name}@1.1.0
        
        Please note that using a more recent version will likely provide a better experience and resolve any 
        known issues from the testing version.
        
        If you have any further questions or need assistance, please don't hesitate to reach out.

`);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }
}

export const { checkModuleVersion } = Version;
