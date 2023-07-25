import semver from 'semver';
import { red, green } from 'colorette';
import axios from 'axios';

import { readPackage } from './package.js';

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

  public static async getLatestVersion() {
    const changelogUrl = 'https://github.com/codeauthor1/sassify-pro/releases';

    try {
      const { name, version } = await readPackage();

      const response = await axios(`https://registry.npmjs.org/${name}/latest`);

      const latestVersion = response.data.version;

      if (latestVersion && latestVersion !== version) {
        console.log(
          `
          A new version of ${name} (${latestVersion}) is available. You are using version ${version}.

          To update, use one of the following commands:

          With npm:
          
          ${green(`npm install ${name}@latest`)}


          With yarn:

          ${green(`yarn add ${name}@latest`)}

          Check the changelog for more details: ${changelogUrl}
          `,
        );
      }
    } catch (error) {
      console.error('Error fetching the latest version:', error.message);
    }
  }
}

export const { checkModuleVersion, getLatestVersion } = Version;

checkModuleVersion();
getLatestVersion();
