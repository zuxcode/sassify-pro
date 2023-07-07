import * as fs from 'node:fs';
import path from 'node:path';
// import SetCompilerConfiguration from './set-compiler-configuration.js';
import { getConfig } from '../abstract/abstract-config.js';

import { ConfigInterface } from '../abstract/abstract-type.js';

class ReadConfigFile {
  /**
   * Retrieves the configuration from the 'sassifypro.json'
   * file or returns the default configuration.
   *
   * @returns {ConfigInterface} The configuration object retrieved
   * from the 'sassifypro.json' file if it exists and contains valid
   *  JSON data. If the file is not found, empty, or there is an error
   * while reading or parsing the file, it returns the default configuration.
   */

  public static getConfig(): ConfigInterface {
    console.log('Fetching configuration  file');

    const configPath = path.join(process.cwd(), 'sassifypro.json');

    const isConfigExist = fs.existsSync(configPath);

    if (!isConfigExist) {
      console.log(
        'Invalid path: Configuration file does not exit. Loading default configuration',
      );
      return getConfig();
    }

    const configStat = fs.statSync(configPath);

    const isInvalidConfigFileSize = configStat.size === 0;

    if (isInvalidConfigFileSize) {
      console.log('Loading default configuration');
      return getConfig();
    }

    try {
      const ReadUserConfigurationFile = fs.readFileSync(configPath, 'utf-8');

      const parseUserConfig: ConfigInterface = JSON.parse(
        ReadUserConfigurationFile,
      );

      if (!parseUserConfig) {
        throw new Error('Parse Error: cannot parse json file');
      }

      // if (parseUserConfig) {
      //   CompilerConfig.config = SetCompilerConfiguration.setCompilerConfiguration(
      //     parseUserConfig,
      //     CompilerConfig.config,
      //   );
      // }
    } catch (error) {
      console.log(`${error.message} Loading Configuration`);
    }
    return getConfig();
  }
}

export default ReadConfigFile;
