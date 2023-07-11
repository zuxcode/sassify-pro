/* eslint-disable no-unused-vars */
import * as fs from 'node:fs';
import path from 'node:path';

import { getConfig } from '../cli/abstract-config.js';

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

  public static async readConfig(
    cb: (err: Error, data: ConfigInterface) => void,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const configPath = path.join(process.cwd(), 'sassifypro.json');

      const isConfigPathExist = fs.existsSync(configPath);

      if (!isConfigPathExist) resolve(getConfig());

      const configFileStat = fs.statSync(configPath);

      const isValidConfigFileSize = configFileStat.size !== 0;

      if (!isValidConfigFileSize) resolve(getConfig());

      fs.readFile(configPath, 'utf-8', (error, data) => {
        if (error) reject(error);

        const parseUserConfigFile: ConfigInterface = JSON.parse(data);

        if (!parseUserConfigFile) reject(error);

        resolve(parseUserConfigFile);
      });
    })
      .then((config: ConfigInterface) => {
        Object.keys(config).forEach((configKey) => {
          Object.keys(getConfig()).forEach((defaultConfigKey) => {
            if (configKey.match(defaultConfigKey)) {
              config = { ...getConfig(), ...config };
            }
          });
        });
        cb(null, config);
      })
      .catch((error) => cb(error, null));
  }
}

export const { readConfig } = ReadConfigFile;
