import DefaultCompilerConfig, {
  ConfigInterface,
} from '../abstract/abstract-config.js';

/**
 * Represents the interface for the
 * CompilerConfig that includes a method
 * for setting the compiler configuration.
 */

export interface CompilerConfigInterface {
  /**
   * Sets the compiler configuration
   * based on the user configuration.
   */

  setCompilerConfig(): void;
}

/**
 * Represents a class that extends the
 * DefaultCompilerConfig and implements
 * the CompilerConfigInterface.
 *
 * @extends DefaultCompilerConfig
 * @implements CompilerConfigInterface
 */

class CompilerConfig
  extends DefaultCompilerConfig
  implements CompilerConfigInterface {
  /**
   * The default configuration object.
   */
  defaultConfig: ConfigInterface;

  /**
   * The user configuration object.
   */
  userConfig: ConfigInterface;

  /**
   * Sets the compiler configuration based on the user configuration.
   */

  public setCompilerConfig(): void {
    Object.keys(this.userConfig).forEach((userConfigKey: string) => {
      Object.keys(this.defaultConfig).forEach((defaultConfigKey) => {
        if (userConfigKey.match(defaultConfigKey)) {
          this.config = this.userConfig[userConfigKey];
        }
      });
    });
  }
}

export default CompilerConfig;
