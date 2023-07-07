import * as fs from 'node:fs';
import path from 'node:path';
import { getConfig } from '../abstract/abstract-config.js';
class ReadConfigFile {
    static getConfig() {
        console.log('Fetching configuration  file');
        const configPath = path.join(process.cwd(), 'sassifypro.json');
        const isConfigExist = fs.existsSync(configPath);
        if (!isConfigExist) {
            console.log('Invalid path: Configuration file does not exit. Loading default configuration');
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
            const parseUserConfig = JSON.parse(ReadUserConfigurationFile);
            if (!parseUserConfig) {
                throw new Error('Parse Error: cannot parse json file');
            }
        }
        catch (error) {
            console.log(`${error.message} Loading Configuration`);
        }
        return getConfig();
    }
}
export default ReadConfigFile;
