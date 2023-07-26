import {
  access, stat, readFile, constants,
} from 'fs/promises';
import path from 'node:path';

import { getConfig, setConfig } from '../cli/index.js';
import type { SassOptions } from '../@types/index.js';

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
    try {
      const currentWorkingDirectory = process.cwd();
      const configPath = path.join(currentWorkingDirectory, 'sassifypro.json');

      // Check if the file is accessible
      await access(configPath, constants.R_OK);

      // Get file stats to check if it is empty
      const configStat = await stat(configPath);
      const isValidConfigSize = configStat.size !== 0;

      if (!isValidConfigSize) {
        // Return the default configuration if the file is empty
        return getConfig();
      }

      // Read and parse the configuration file
      const data = await readFile(configPath, 'utf-8');
      const parsedUserConfigFile: SassOptions = JSON.parse(data);

      if (!parsedUserConfigFile) {
        throw new Error('Invalid JSON file.');
      }

      // Merge the parsed configuration with the existing one
      const updatedConfig = { ...getConfig(), ...parsedUserConfigFile };

      // Update the configuration
      setConfig(updatedConfig);

      // Return the updated configuration
      return updatedConfig;
    } catch (error) {
      // Handle errors and re-throw with a more informative message if necessary
      throw new Error('Error reading or parsing the configuration file.');
    }
  }
}

/**
 * Shortcut for reading the configuration file and returning the parsed {@link SassOptions}.
 *
 * @returns A promise that resolves to the updated parsed {@link SassOptions} configuration.
 * @throws {Error} If there is an error reading or parsing the configuration file.
 */
export const { readAndUpdateConfig } = ReadConfigFile;
