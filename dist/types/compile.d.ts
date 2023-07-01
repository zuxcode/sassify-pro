import ReadConfigFile from './config/read-config.js';
/**
 * Represents a class that compiles Sass files based on the configuration settings.
 * @extends ReadConfigFile
 */
declare class CompileSass extends ReadConfigFile {
    /**
     * Compiles Sass files based on the configuration settings.
     */
    compiler(): void;
}
export default CompileSass;
