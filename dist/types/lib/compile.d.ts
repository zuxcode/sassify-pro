/**
 * @callback CompileSass
 * @description Compile sass/scss to css
 */
declare class CompileSass {
    sassifyProJson: {
        sourceDir?: string;
        outputDir?: string;
        watch?: boolean;
        sourceMap?: boolean;
        importPaths?: string[];
        excludePaths?: string[];
        style?: 'compressed' | 'expanded';
        autoprefixer?: boolean;
        quietDeps?: boolean;
        sourceMapIncludeSources?: boolean;
        verbose: boolean;
    };
    readonly configPath: string;
    fileDependency: string[];
    ignoreDependency: string[];
    constructor();
    /**
     * @method readSassifyProJson
     * @description read the sassifypro.json or load default settings
     * @returns void
     */
    readSassifyProJson(): void;
    /**
     * @method searchFile
     * @description search and retrieve all sass files is the src directory
     * @returns void
     */
    searchFile(): void;
    /**
     * @method compiler
     * @description the method calls the sass compiler. and compiler the given files
     */
    compiler(): void;
}
export default CompileSass;
