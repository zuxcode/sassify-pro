#!/usr/bin/env node
declare class Config {
    private packageName;
    private globalPath;
    private localPath;
    private packagePath;
    protected name: string;
    protected version: string;
    protected description: string;
    protected author: string;
    protected packageJson: {
        author: {
            name: 'CodeAuthor1';
            email: 'codeauthor2000@gmail.com';
            url: 'https://www.twitter.com/codeauthor1';
        };
        name: string;
        version: string;
        description: string;
    };
    constructor();
    packageJsonSnapshot(): void;
    readPackageJson(): void;
}
export default Config;
