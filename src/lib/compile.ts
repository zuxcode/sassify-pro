import * as sass from 'sass';
import fs from 'fs';
import path from 'path';

/**
 * @callback CompileSass
 * @description Compile sass/scss to css
 */
class CompileSass {
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

  constructor() {
    this.configPath = path.join(process.cwd(), 'sassifypro.json');
    this.ignoreDependency = [];
    this.fileDependency = [];
    this.sassifyProJson = {
      autoprefixer: true,
      outputDir: 'public',
      sourceDir: 'src',
      style: 'expanded',
      sourceMap: true,
      watch: false,
      excludePaths: [],
      importPaths: [],
      quietDeps: false,
      sourceMapIncludeSources: false,
      verbose: false,
    };
  }

  /**
   * @method readSassifyProJson
   * @description read the sassifypro.json or load default settings
   * @returns void
   */
  readSassifyProJson() {
    console.log('searching for custom config settings');
    if (!fs.existsSync(this.configPath)) {
      console.log('searching for custom config settings');

      console.log(
        'can not find custom config, fall back to default default config',
      );
    } else {
      console.log('Parsing config settings');
      this.sassifyProJson = JSON.parse(
        fs.readFileSync(this.configPath, 'utf-8'),
      );
    }
  }

  /**
   * @method searchFile
   * @description search and retrieve all sass files is the src directory
   * @returns void
   */
  searchFile() {
    const rootStack = fs.readdirSync(this.sassifyProJson.sourceDir);

    let pathName: string;

    const subDirectory = [];

    // const FileDependency = [];

    /**
     * @description loop through the root directory and sub directory and retrieve all sass file
     */
    rootStack.forEach((currentStack) => {
      const fullPath = path.join(this.sassifyProJson.sourceDir, currentStack);
      const statPath = fs.statSync(fullPath);

      /**
       * @description check if currentStack is a directory
       */
      if (statPath.isDirectory()) {
        const subdir = fs.readdirSync(fullPath);
        subDirectory.push(...subdir);
        pathName = fullPath;
      } else if (fullPath.match(/.s[ac]ss$/)) {
        this.fileDependency.push(fullPath);
      }

      while (subDirectory.length > 0) {
        const childStack = subDirectory.pop();
        const childStackPath = path.join(pathName, childStack);

        const childStackStat = fs.statSync(childStackPath);

        if (childStackStat.isDirectory()) {
          const subdir = fs.readdirSync(childStackPath);
          subDirectory.push(...subdir);
          pathName = childStackPath;
        } else if (childStackPath.match(/.s[ac]ss$/)) {
          this.fileDependency.push(childStackPath);
        }
      }
    });
  }

  // fileIgnore() {
  //   this.sassifyProJson.excludePaths.forEach((file) => {});
  // }

  /**
   * @method compiler
   * @description the method calls the sass compiler. and compiler the given files
   */
  compiler() {
    console.log('Starting SassifyPro');

    this.readSassifyProJson();

    console.log('Reading Project directory');

    this.searchFile();

    /**
     * @description resolve output path
     */
    const outputPath = path.resolve(
      process.cwd(),
      this.sassifyProJson.outputDir,
    );
    console.log('Checking if out path exist');

    this.fileDependency.forEach((file) => {
      sass
        .compileAsync(file, {
          alertAscii: true,
          alertColor: true,
          charset: true,
          quietDeps: this.sassifyProJson.quietDeps,
          sourceMap: this.sassifyProJson.sourceMap,
          sourceMapIncludeSources: this.sassifyProJson.sourceMapIncludeSources,
          style: this.sassifyProJson.style,
        })
        .then((result) => {
          result.loadedUrls.forEach((url) => {
            /**
             * @description check if output part exist,
             * if path is not found, create path
             */
            if (!fs.existsSync(outputPath)) {
              console.log('Create Output Path');
              fs.mkdirSync(outputPath, { recursive: true });
              console.log('override file');

              const fileName = path.basename(url.pathname);
              console.log('Writing File');
              const renameFile = fileName.replace(/.s[ac]ss$/, '.css');

              fs.writeFileSync(path.join(outputPath, renameFile), result.css);
            } else {
              const fileName = path.basename(url.pathname);
              console.log('Writing File');
              const renameFile = fileName.replace(/.s[ac]ss$/, '.css');

              fs.writeFileSync(path.join(outputPath, renameFile), result.css);
            }
          });
        });
    });
  }
}
export default CompileSass;
