import figlet from 'figlet';
import chalk from 'chalk';
import { writeFile } from 'fs/promises';
import { join } from 'node:path';
import { createSpinner } from 'nanospinner';

import { readPackage } from '../utils/package.js';
import { readAndUpdateConfig } from '../config/read-and-update-config.js';

/**
 * Provides initialization functionality for SassifyPro.
 */
export default class Initialize {
  /**
   * Displays the SassifyPro message and ASCII art logo.
   */
  public static message(): void {
    const packageJson = readPackage();
    const { name, version, author } = packageJson;
    console.log(
      chalk.bgHex('#ff0000').whiteBright(` ${name} `),
      chalk.gray(`v${version} by ${author.match(/^codeauthor1/)}`),
    );
    console.log(
      figlet.textSync(name, {
        font: 'Banner3',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 150,
        whitespaceBreak: true,
      }),
    );
  }

  /**
   * Displays the SassifyPro version.
   */
  public static version(): void {
    const packageJson = readPackage();
    const { name, version } = packageJson;
    console.log(
      chalk.bgHex('#ff0000').whiteBright(` ${name} `),
      chalk.gray(`v${version}`),
    );
  }

  /**
   * Initializes SassifyPro by updating the sassifypro.json configuration file.
   * If the file already exists, it will be overwritten with the updated configuration.
   */
  public static async sassifyproInit(): Promise<void> {
    const configPath = join(process.cwd(), 'sassifypro.json');
    const spinner = createSpinner();

    try {
      const sassifyproConfig = await readAndUpdateConfig();

      const stringifySassifyProConfig = JSON.stringify(
        sassifyproConfig,
        null,
        2,
      );

      await writeFile(configPath, stringifySassifyProConfig, 'utf8');

      spinner.success({
        text: chalk.green('sassifypro.json has been updated successfully.'),
      });
    } catch (parseError: unknown) {
      spinner.error({
        text: chalk.red('Error parsing existing sassifypro.json:'),
      });
      console.error(parseError);
    }
  }
}

/**
 * Shortcut for displaying the SassifyPro message and ASCII art logo.
 */
export const { message, version, sassifyproInit } = Initialize;
