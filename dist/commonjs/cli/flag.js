import MetaData from '../config/meta-data.js';
export default class Commander {
    command;
    constructor() {
        this.command = {
            compile: {
                default: true,
                command: 'compile',
                alias: 'c',
                description: 'compile sass/scss to css',
            },
            watch: {
                default: false,
                command: '--watch',
                alias: '-w',
                description: 'Indicates whether to start sassifyPro in watch mode and watch for changes',
            },
            sourceMap: {
                default: false,
                command: '--source-map',
                alias: '-m',
                description: 'Determines whether source maps should be generated',
            },
            importPath: {
                default: undefined,
                command: '--import-path',
                alias: '-p',
                description: 'Additional paths to search for imported files or dependencies',
            },
            sourceDir: {
                default: './src',
                command: '--input',
                alias: '-i',
                description: 'The source directory sassifypro should look for sass files',
            },
            outputDir: {
                default: './public',
                command: '--output',
                alias: '-o',
                description: 'The output directory to save the compile sass file',
            },
            style: {
                default: 'expanded',
                command: '--style',
                alias: '-s',
                description: 'The style format for CSS. `compressed`: CSS should be compressed. `expanded`: CSS should be expanded.',
            },
            autoprefixer: {
                default: true,
                command: '--autoprefixer',
                alias: '-a',
                description: 'Indicates whether autoprefixer should be enabled for CSS',
            },
            version: {
                alias: '-v',
                command: '--version',
                default: MetaData.metaDetails.version,
                description: `by ${MetaData.metaDetails.authorName}`,
            },
        };
    }
}
