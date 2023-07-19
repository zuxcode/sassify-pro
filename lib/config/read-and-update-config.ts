import { access, stat, readFile } from 'fs/promises';
import path from 'node:path';

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
    const configPath = path.join(process.cwd(), 'sassifyprorc.json');

    return access(configPath)
      .then(async (): Promise<SassOptions> => {
        const configFileStat = await stat(configPath);

        const isValidConfigFileSize = configFileStat.size !== 0;

        if (!isValidConfigFileSize) {
          return getConfig();
        }

        const data = await readFile(configPath, 'utf-8');

        const parsedUserConfigFile: SassOptions = JSON.parse(data);

        if (!parsedUserConfigFile) {
          throw new Error('Invalid Json file.');
        }

        const updatedConfig = { ...getConfig(), ...parsedUserConfigFile };

        setConfig(updatedConfig);

        return updatedConfig;
      })
      .catch(() => getConfig());
  }
}

/**
 * Shortcut for reading the configuration file and returning the parsed {@link SassOptions}.
 *
 * @returns A promise that resolves to the updated parsed {@link SassOptions} configuration.
 * @throws {Error} If there is an error reading or parsing the configuration file.
 */
export const { readAndUpdateConfig } = ReadConfigFile;
