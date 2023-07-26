import semver from 'semver';
import { red, green } from 'colorette';

import { readPackage } from './index.js';

export default class Version {
  public static async checkModuleVersion() {
    try {
      const supportedVersion = '1.0.6';

      const packageJson = readPackage();

      const { version, name } = await packageJson;

      if (
        semver.lt(version, supportedVersion)
        || semver.eq(version, supportedVersion)
      ) {
        throw new Error(
          `
          ${red('Error: Module Testing Notice')}
          
          The current version of this module (${version}) was intended for testing purposes and may 
          contain known bugs or issues. We strongly recommend installing the latest version or a version higher
          than ${supportedVersion} for improved stability and bug fixes.
          
          To install the latest version, please run the following command:
        
          ${green(`npm install ${name}@latest`)}
        
          If you prefer to install a version higher than ${version}, you can specify the desired version explicitly:
        
          ${green(`npm install ${name}@1.1.0`)}
        
          Please note that using a more recent version will likely provide a better experience and resolve any 
          known issues from the testing version.
          
          If you have any further questions or need assistance, please don't hesitate to reach out.
          `,
        );
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export const { checkModuleVersion } = Version;

checkModuleVersion();
