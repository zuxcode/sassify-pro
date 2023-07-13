import path from 'node:path';
import { SassOptions } from '../@types/sass-options.js';

/**
 * Abstract class representing Sass configuration.
 */
export default abstract class SassConfig {
  /**
   * Default Sass configuration.
   */
  private static config: SassOptions = {
    autoprefixer: true,
    outputDir: 'public',
    sourceDir: path.basename(process.cwd()),
    style: 'expanded',
    watch: false,
    excludePaths: /\/node_modules\/*\//,
    importPaths: [],
  };

  /**
   * Get the current Sass configuration.
   * @returns The current Sass configuration.
   */
  public static getConfig(): SassOptions {
    return SassConfig.config;
  }

  /**
   * Set the Sass configuration.
   * @param config - The new Sass configuration to set.
   */
  public static setConfig(config: SassOptions): void {
    SassConfig.config = { ...SassConfig.getConfig(), ...config };
    Object.keys(config).forEach((configKey) => {
      Object.keys(SassConfig.getConfig()).forEach((defaultConfigKey) => {
        if (configKey.match(defaultConfigKey)) {
          SassConfig.config = { ...SassConfig.getConfig(), ...config };
        }
      });
    });    
  }
}

export const { getConfig, setConfig } = SassConfig;
