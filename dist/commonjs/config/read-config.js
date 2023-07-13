import * as fs from 'node:fs';
import path from 'node:path';
import { getConfig, setConfig } from '../cli/sass-options.js';
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
            setConfig(config);
            cb(null, config);
        })
            .catch((error) => cb(error, null));
    }
}
export const { readConfig } = ReadConfigFile;
