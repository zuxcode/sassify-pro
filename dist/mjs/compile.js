import * as sass from 'sass';
import * as fs from 'node:fs';
import path from 'path';
import SearchFile from './module/search-file.js';
import ReadConfigFile from './config/read-config.js';
/**
 * Represents a class that compiles Sass files based on the configuration settings.
 * @extends ReadConfigFile
 */
class CompileSass extends ReadConfigFile {
    /**
     * Compiles Sass files based on the configuration settings.
     */
    compiler() {
        console.log('Starting SassifyPro');
        const config = this.getConfig();
        console.log('Reading Project directory');
        const files = SearchFile.searchFile(config.sourceDir, config.excludePaths);
        files.forEach((file) => {
            (async () => {
                const compileResult = await sass.compileAsync(file, {
                    alertAscii: true,
                    alertColor: true,
                    charset: true,
                    quietDeps: config.quietDeps,
                    sourceMap: config.sourceMap,
                    sourceMapIncludeSources: config.sourceMapIncludeSources,
                    style: config.style,
                    verbose: config.verbose,
                });
                const { loadedUrls } = compileResult;
                loadedUrls.forEach((url) => {
                    if (!fs.existsSync(config.outputDir)) {
                        console.log('Create Output Path');
                        fs.mkdirSync(config.outputDir, { recursive: true });
                        console.log('override file');
                        const fileName = path.basename(url.pathname);
                        console.log('Writing File');
                        const renameFile = fileName.replace(/.s[ac]ss$/, '.css');
                        fs.writeFileSync(path.join(config.outputDir, renameFile), compileResult.css);
                    }
                    else {
                        const fileName = path.basename(url.pathname);
                        console.log('Writing File');
                        const renameFile = fileName.replace(/.s[ac]ss$/, '.css');
                        fs.writeFileSync(path.join(config.outputDir, renameFile), compileResult.css);
                    }
                });
            })();
        });
    }
}
export default CompileSass;
