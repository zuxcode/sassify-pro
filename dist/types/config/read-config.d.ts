import CompilerConfig from './config-compiler.js';
import DefaultCompilerConfig, { ConfigInterface } from '../abstract/abstract-config.js';
/**
 * Represents the interface that extends the `DefaultCompilerConfig`
 * and includes additional properties for searching a configuration
 * file and retrieving the user configuration.
 */
interface SearchFileInterface extends DefaultCompilerConfig {
    /**
     * The path to the configuration file.
     */
    configPath: string;
    /**
     * Regular expression to match white space or empty string.
     */
    matchWhiteSpaceEmptyString: RegExp;
    /**
     * Retrieves the configuration from the 'sassifypro.json'
     * file or returns the default configuration.
     *
     * @returns {ConfigInterface} The configuration object retrieved
     * from the 'sassifypro.json' file if it exists and contains valid
     *  JSON data. If the file is not found, empty, or there is an error
     * while reading or parsing the file, it returns the default configuration.
     */
    getConfig(): ConfigInterface | null;
}
/**
 * Represents a class that reads a configuration file and
 * implements the `SearchFileInterface`.
 * @extends CompilerConfig
 * @implements SearchFileInterface
 */
declare class ReadConfigFile extends CompilerConfig implements SearchFileInterface {
    /**
     * The path to the configuration file.
     */
    configPath: string;
    /**
     * Regular expression to match white space or empty string.
     */
    matchWhiteSpaceEmptyString: RegExp;
    /**
     * Creates an instance of `ReadConfigFile` class.
     */
    constructor();
    /**
     * Retrieves the configuration from the 'sassifypro.json'
     * file or returns the default configuration.
     *
     * @returns {ConfigInterface} The configuration object retrieved
     * from the 'sassifypro.json' file if it exists and contains valid
     *  JSON data. If the file is not found, empty, or there is an error
     * while reading or parsing the file, it returns the default configuration.
     */
    getConfig(): ConfigInterface;
}
export default ReadConfigFile;
