import DefaultCompilerConfig from '../abstract/abstract-config.js';
/**
 * Represents a class that extends the
 * DefaultCompilerConfig and implements
 * the CompilerConfigInterface.
 *
 * @extends DefaultCompilerConfig
 * @implements CompilerConfigInterface
 */
class CompilerConfig extends DefaultCompilerConfig {
    /**
     * The default configuration object.
     */
    defaultConfig;
    /**
     * The user configuration object.
     */
    userConfig;
    /**
     * Sets the compiler configuration based on the user configuration.
     */
    setCompilerConfig() {
        Object.keys(this.userConfig).forEach((userConfigKey) => {
            Object.keys(this.defaultConfig).forEach((defaultConfigKey) => {
                if (userConfigKey.match(defaultConfigKey)) {
                    this.config = this.userConfig[userConfigKey];
                }
            });
        });
    }
}
export default CompilerConfig;
