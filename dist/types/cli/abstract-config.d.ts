import { ConfigInterface } from '../types/abstract-type.js';
export default abstract class CompilerConfig {
    private static config;
    static getConfig(): ConfigInterface;
}
export declare const getConfig: typeof CompilerConfig.getConfig;
