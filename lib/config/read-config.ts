/* eslint-disable no-unused-vars */
import * as fs from 'node:fs';
import path from 'node:path';

import { getConfig, setConfig } from '../cli/sass-options.js';

import { SassOptions } from '../@types/sass-options.js';

export default class ReadConfigFile {
  public static async readConfig(
    cb: (err: Error, data: SassOptions) => void,
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

        const parseUserConfigFile: SassOptions = JSON.parse(data);

        if (!parseUserConfigFile) reject(error);

        resolve(parseUserConfigFile);
      });
    })
      .then((config: SassOptions) => {
        setConfig(config);

        cb(null, config);
      })
      .catch((error) => cb(error, null));
  }
}

export const { readConfig } = ReadConfigFile;
