import {
  access, stat, readFile, constants,
} from 'fs/promises';
import path from 'node:path';

import { Stats } from 'fs';
import { getConfig, setConfig } from '../cli/sass-options.js';
import type { SassOptions } from '../@types/sass-options.js';

/**
 * Utility class for reading the configuration file and updating the Sass configuration.
 */
export default class ReadConfigFile {
  /**
   * Reads the configuration file and returns the parsed {@link SassOptions}.
   * If the configuration file is not found or is invalid, the default configuration is returned.
   *
   * @returns A promise that resolves to the updated parsed {@link SassOptions} configuration.
   * @throws {Error} If there is an error reading or parsing the configuration file.
   */
  public static async readAndUpdateConfig(): Promise<SassOptions> {
    return new Promise((resolve) => {
      const currentWorkingDirectory = process.cwd();

      const configPath = path.join(currentWorkingDirectory, 'sassifypro.json');

      function readFileCallBack(data: string) {
        const parsedUserConfigFile: SassOptions = JSON.parse(data);

        if (!parsedUserConfigFile) {
          throw new Error('Invalid Json file.');
        }

        const updatedConfig = { ...getConfig(), ...parsedUserConfigFile };

        setConfig(updatedConfig);

        resolve(updatedConfig);
      }

      function accessCatchCallBack() {
        resolve(getConfig());
      }

      function statCallBack(configStat: Stats) {
        const isValidConfigSize = configStat.size !== 0;

        if (!isValidConfigSize) {
          resolve(getConfig());
        } else {
          readFile(configPath, 'utf-8').then(readFileCallBack);
        }
      }

      function accessThenCallBack() {
        stat(configPath).then(statCallBack);
      }

      access(configPath, constants.R_OK)
        .then(accessThenCallBack)
        .catch(accessCatchCallBack);
    });
  }
}

/**
 * Shortcut for reading the configuration file and returning the parsed {@link SassOptions}.
 *
 * @returns A promise that resolves to the updated parsed {@link SassOptions} configuration.
 * @throws {Error} If there is an error reading or parsing the configuration file.
 */
export const { readAndUpdateConfig } = ReadConfigFile;
