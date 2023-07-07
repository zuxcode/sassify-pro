interface FlagInterface {
    compile: {
        type?: boolean;
        default: boolean;
        command: string;
        alias: string;
        description: string;
    };
    watch: {
        type?: boolean;
        default: boolean;
        command: string;
        alias: string;
        description: string;
    };
    sourceMap: {
        type?: boolean;
        default: boolean;
        command: string;
        alias: string;
        description: string;
    };
    importPath: {
        type?: string[];
        default: undefined | string[];
        command: string;
        alias: string;
        description: string;
    };
    sourceDir: {
        type?: string;
        default: string;
        command: string;
        alias: string;
        description: string;
    };
    outputDir: {
        type?: string;
        default: string;
        command: string;
        alias: string;
        description: string;
    };
    style: {
        type?: string;
        default: string;
        command: string;
        alias: string;
        description: string;
    };
    autoprefixer: {
        type?: boolean;
        default: boolean;
        command: string;
        alias: string;
        description: string;
    };
    version: {
        type?: string;
        default: string;
        command: string;
        alias: string;
        description: string;
    };
}
export default class Commander {
    command: FlagInterface;
    constructor();
}
export {};
