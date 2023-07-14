import figlet from 'figlet';
import chalk from 'chalk';
import { writeFile } from 'fs/promises';
import { join } from 'node:path';
import { createSpinner } from 'nanospinner';
import { readPackage } from '../utils/package.js';
import { readAndUpdateConfig } from '../config/read-and-update-config.js';
export default class Initialize {
    static message() {
        const packageJson = readPackage();
        const { name, version, author } = packageJson;
        console.log(chalk.bgHex('#ff0000').whiteBright(` ${name} `), chalk.gray(`v${version} by ${author.match(/^codeauthor1/)}`));
        console.log(figlet.textSync(name, {
            font: 'Banner3',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 150,
            whitespaceBreak: true,
        }));
    }
    static version() {
        const packageJson = readPackage();
        const { name, version } = packageJson;
        console.log(chalk.bgHex('#ff0000').whiteBright(` ${name} `), chalk.gray(`v${version}`));
    }
    static async sassifyproInit() {
        const configPath = join(process.cwd(), 'sassifypro.json');
        const spinner = createSpinner();
        try {
            const sassifyproConfig = await readAndUpdateConfig();
            const stringifySassifyProConfig = JSON.stringify(sassifyproConfig, null, 2);
            await writeFile(configPath, stringifySassifyProConfig, 'utf8');
            spinner.success({
                text: chalk.green('sassifypro.json has been updated successfully.'),
            });
        }
        catch (parseError) {
            spinner.error({
                text: chalk.red('Error parsing existing sassifypro.json:'),
            });
            console.error(parseError);
        }
    }
}
export const { message, version, sassifyproInit } = Initialize;
