import * as fs from 'node:fs';
import path from 'node:path';
import CompilerConfig from './config-compiler.js';
import DefaultCompilerConfig, {
  ConfigInterface,
} from '../abstract/abstract-config.js';

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

class ReadConfigFile extends CompilerConfig implements SearchFileInterface {
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

  constructor() {
    super();

    this.matchWhiteSpaceEmptyString = /^$|\s+/;

    this.userConfig = {};
  }

  /**
   * Retrieves the configuration from the 'sassifypro.json'
   * file or returns the default configuration.
   *
   * @returns {ConfigInterface} The configuration object retrieved
   * from the 'sassifypro.json' file if it exists and contains valid
   *  JSON data. If the file is not found, empty, or there is an error
   * while reading or parsing the file, it returns the default configuration.
   */

  getConfig(): ConfigInterface {
    console.log('Fetching configuration  file');

    const configPath = path.join(process.cwd(), 'sassifypro.json');

    const isConfigExist = fs.existsSync(configPath);

    if (!isConfigExist) {
      return this.config;
    }

    const isExist = fs.existsSync(this.configPath);

    if (!isExist) {
      console.log(
        'Invalid path: Configuration file does not exit. Loading default configuration',
      );
      return this.config;
    }

    const configStat = fs.statSync(this.configPath);

    const CheckConfigFileSize = configStat.size === 0;

    if (CheckConfigFileSize) {
      console.log('Loading default configuration');
      return this.config;
    }

    try {
      const ReadUserConfig = fs.readFileSync(this.configPath, 'utf-8');

      const parseUserConfig = JSON.parse(ReadUserConfig);

      if (parseUserConfig) {
        this.config = parseUserConfig;
        return this.config;
      }
    } catch (error) {
      console.log('Loading Configuration');
    }
    return this.config;
  }
}

export default ReadConfigFile;
