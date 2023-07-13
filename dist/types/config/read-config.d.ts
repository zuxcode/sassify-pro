import { SassOptions } from '../@types/sass-options.js';
export default class ReadConfigFile {
    static readConfig(cb: (err: Error, data: SassOptions) => void): Promise<void>;
}
export declare const readConfig: typeof ReadConfigFile.readConfig;
