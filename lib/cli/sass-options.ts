import path from 'node:path';
import { SassOptions } from '../@types/sass-options.js';

/**
 * Provides configuration management for Sass.
 * @see {@link SassOptions}
 */
export default abstract class SassConfig {
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
   * Gets the current Sass configuration.
   * @returns The current Sass configuration.
   * @see {@link SassOptions} for the Sass configuration options.
   */
  public static getConfig(): SassOptions {
    return SassConfig.config;
  }

  /**
   * Sets the Sass configuration.
   * @param config - The Sass configuration to set.
   * @see {@link SassOptions} for the Sass configuration options.
   */
  public static setConfig(config: SassOptions): void {
    SassConfig.config = config;
  }
}

/**
 * Shortcut for getting the current Sass configuration.
 * @returns The current Sass configuration.
 * @see {@link SassOptions} for the Sass configuration options.
 */
export const { getConfig, setConfig } = SassConfig;
