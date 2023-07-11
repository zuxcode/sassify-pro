import * as fs from 'node:fs';
import path from 'node:path';
import { getConfig } from '../cli/abstract-config.js';
export default class ReadConfigFile {
    static async readConfig(cb) {
        return new Promise((resolve, reject) => {
            const configPath = path.join(process.cwd(), 'sassifypro.json');
            const isConfigPathExist = fs.existsSync(configPath);
            if (!isConfigPathExist)
                resolve(getConfig());
            const configFileStat = fs.statSync(configPath);
            const isValidConfigFileSize = configFileStat.size !== 0;
            if (!isValidConfigFileSize)
                resolve(getConfig());
            fs.readFile(configPath, 'utf-8', (error, data) => {
                if (error)
                    reject(error);
                const parseUserConfigFile = JSON.parse(data);
                if (!parseUserConfigFile)
                    reject(error);
                resolve(parseUserConfigFile);
            });
        })
            .then((config) => {
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
