#!/usr/bin/env node
import fs from 'fs';
// import path from 'path';
import { exec } from 'child_process';
class Config {
    packageName = 'sassify-pro';
    globalPath;
    localPath;
    packagePath;
    name;
    version;
    description;
    author;
    packageJson;
    constructor() {
        // this.pkgPath = path.resolve(
        //   process.cwd(),
        //   'node_modules',
        //   'sassify-pro/package.json',
        // );
        this.readPackageJson();
    }
    packageJsonSnapshot() {
        this.name = this.packageJson.name;
        this.version = this.packageJson.version;
        this.description = this.packageJson.description;
        this.author = this.packageJson.name;
    }
    readPackageJson() {
        // Execute the 'npm root ' command to get the local installation path
        exec('npm root', (error, stdout) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return 1;
            }
            this.localPath = stdout.trim();
            this.packagePath = `${this.localPath}/${this.packageName}`;
            // Check if the package directory exists
            exec(`ls ${this.packagePath}`, (err) => {
                if (!err) {
                    console.log(`The package '${this.packageName}' is installed locally at: ${this.packagePath}`);
                    this.packageJson = JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
                    this.packageJsonSnapshot();
                    return 0;
                }
                console.log(`The package '${this.packageName}' is not installed locally.`);
                // Execute the 'npm root -g' command to get the global installation path
                exec('npm root -g', (er, print) => {
                    if (er) {
                        console.error(`Error executing command: ${er.message}`);
                        return 1;
                    }
                    this.globalPath = print.trim();
                    this.packagePath = `${this.globalPath}/${this.packageName}`;
                    // Check if the package directory exists
                    exec(`ls ${this.packagePath}`, (e) => {
                        if (!e) {
                            console.log(`The package '${this.packageName}' is installed globally at: ${this.packagePath}`);
                            this.packageJson = JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
                            this.packageJsonSnapshot();
                            return 0;
                        }
                        console.log(`The package '${this.packageName}' is not installed globally.`);
                        return 1;
                    });
                    return 1;
                });
                return 1;
            });
            return 1;
        });
    }
}
export default Config;
