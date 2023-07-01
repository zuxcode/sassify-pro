/**
 * Configuration options for a SassifyPro compiler.
 */
/**
 * Represents the default configuration for a compiler.
 */
class DefaultCompilerConfig {
    /**
     * The configuration options for the compiler.
     */
    config = {
        /**
         * Determines whether autoprefixer should be enabled for CSS.
         * Autoprefixer automatically adds vendor prefixes to CSS properties
         * to ensure cross-browser compatibility.
         * Default: true
         */
        autoprefixer: true,
        /**
         * Specifies the output directory for the compiled files.
         * Default: 'public'
         */
        outputDir: 'public',
        /**
         * Specifies the source directory for the compiler.
         * Default: 'src'
         */
        sourceDir: 'src',
        /**
         * Specifies the style format for CSS.
         * Possible values: 'compressed' or 'expanded'
         * Default: 'expanded'
         */
        style: 'expanded',
        /**
         * Determines whether source maps should be generated during the compilation.
         * Source maps are used to map the generated output code
         *  back to the original source code for debugging purposes.
         * Default: true
         */
        sourceMap: true,
        /**
         * Determines whether the compiled output should be minified.
         * Default: true
         */
        minified: true,
        /**
         * Indicates whether the compiler should watch for file changes and recompile automatically.
         * Default: false
         */
        watch: false,
        /**
         * Specifies an array of paths to exclude from the compilation.
         * Files or directories matching these paths will be ignored during the compilation.
         * Default: []
         */
        excludePaths: [],
        /**
         * Specifies an array of additional paths to search for imported files or dependencies.
         * Default: []
         */
        importPaths: [],
        /**
         * Determines whether dependency-related messages should be displayed during the compilation.
         * Default: false
         */
        quietDeps: false,
        /**
         * Specifies whether the source map should include
         * the original source code in addition to the generated code.
         * Default: false
         */
        sourceMapIncludeSources: false,
        /**
         * Determines the verbosity of the compilation process.
         * If set to true, detailed or additional information will be displayed during execution.
         * Default: false
         */
        verbose: false,
    };
}
export default DefaultCompilerConfig;
