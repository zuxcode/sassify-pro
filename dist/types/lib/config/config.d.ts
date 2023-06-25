import { Command } from 'commander';
declare class Config {
    program: Command;
    name: Command;
    version: Command;
    filePath: string;
    packageJson: JSON;
    constructor();
}
export default Config;
