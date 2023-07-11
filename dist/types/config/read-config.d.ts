import { ConfigInterface } from '../types/abstract-type.js';
export default class ReadConfigFile {
    static readConfig(cb: (err: Error, data: ConfigInterface) => void): Promise<void>;
}
export declare const readConfig: typeof ReadConfigFile.readConfig;
