import { ConfigInterface } from './abstract-type.js';
export default abstract class CompilerConfig {
    private static config;
    static setConfig(props: (config: ConfigInterface) => ConfigInterface): void;
    static getConfig(): ConfigInterface;
}
export declare const getConfig: typeof CompilerConfig.getConfig, setConfig: typeof CompilerConfig.setConfig;
