import * as fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

import { getConfig, setConfig } from '../abstract/abstract-config.js';

import { ConfigInterface } from '../types/abstract-type.js';

export default class ReadConfigFile {
  /**
   * Retrieves the configuration from the 'sassifypro.json'
   * file or returns the default configuration.
   *
   * @returns {ConfigInterface} The configuration object retrieved
   * from the 'sassifypro.json' file if it exists and contains valid
   *  JSON data. If the file is not found, empty, or there is an error
   * while reading or parsing the file, it returns the default configuration.
   */

  public static readConfig(): ConfigInterface {
    const configPath = path.join(process.cwd(), 'sassifypro.json');

    const isConfigPathExist = fs.existsSync(configPath);

    if (!isConfigPathExist) return getConfig();

    const configFileStat = fs.statSync(configPath);

    const isValidConfigFileSize = configFileStat.size !== 0;

    if (!isValidConfigFileSize) return getConfig();

    try {
      const ReadUserConfigurationFile = fs.readFileSync(configPath, 'utf-8');

      const parseUserConfigFile: ConfigInterface = JSON.parse(
        ReadUserConfigurationFile,
      );

      if (!parseUserConfigFile) throw new Error('File to parse JSON file: Invalid Json format.');

      Object.keys(parseUserConfigFile).forEach((configKey) => {
        Object.keys(getConfig()).forEach((defaultConfigKey) => {
          if (configKey.match(defaultConfigKey)) {
            setConfig(
              // eslint-disable-next-line no-return-assign
              () => (getConfig()[defaultConfigKey] = parseUserConfigFile[configKey]),
            );
          }
        });
      });

      return getConfig();
    } catch (error) {
      createSpinner().error({
        text: `${chalk.red(error.message)}} ${chalk.green(
          'Falling back to default configuration',
        )}`,
      });

      return getConfig();
    }
  }
}

export const { readConfig } = ReadConfigFile;
