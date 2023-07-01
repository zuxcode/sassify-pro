/**
 * Configuration options for a SassifyPro compiler.
 */
export interface ConfigInterface {
    /**
     * The source directory for the task.
     */
    sourceDir?: string;
    /**
     * The output directory for the task.
     */
    outputDir?: string;
    /**
     * Indicates whether the task should watch for changes.
     */
    watch?: boolean;
    /**
     * Determines whether source maps should be generated.
     */
    sourceMap?: boolean;
    /**
     * Additional paths to search for imported files or dependencies.
     */
    importPaths?: string[];
    /**
     * Paths to exclude from the task.
     */
    excludePaths?: string[];
    /**
     * Indicates whether the output should be minified.
     */
    minified?: boolean;
    /**
     * The style format for CSS.
     * - `compressed`: CSS should be compressed.
     * - `expanded`: CSS should be expanded.
     */
    style?: 'compressed' | 'expanded';
    /**
     * Determines whether dependency-related messages should be suppressed.
     */
    quietDeps?: boolean;
    /**
     * Specifies whether the source map should include the original sources.
     */
    sourceMapIncludeSources?: boolean;
    /**
     * Indicates whether autoprefixer should be enabled for CSS.
     */
    autoprefixer?: boolean;
    /**
     * Determines the verbosity of the task.
     */
    verbose?: boolean;
}
/**
 * Represents the default configuration for a compiler.
 */
declare abstract class DefaultCompilerConfig {
    /**
     * The configuration options for the compiler.
     */
    config: ConfigInterface;
}
export default DefaultCompilerConfig;
