import figlet from 'figlet';
import colorette from 'colorette';
import { writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { createSpinner } from 'nanospinner';

import { readPackage } from '../utils/package.js';
import { readAndUpdateConfig } from '../config/index.js';
import { getConfig } from './sass-options.js';

const BG_RED = colorette.bgRed('#ff0000');
const WHITE_BRIGHT = colorette.whiteBright;
const GRAY = colorette.gray;
const GREEN = colorette.green;

/**
 * Provides initialization functionality for SassifyPro.
 */
export default class Initialize {
  /**
   * Displays the SassifyPro message and ASCII art logo.S
   */
  public static async message(): Promise<void> {
    const { name, version, author } = await readPackage();
    console.log(
      `${BG_RED} ${WHITE_BRIGHT(name)} ${GRAY(
        `v${version} by ${author.match(/^codeauthor1/)}\n`,
      )}`,
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
  public static async version(): Promise<void> {
    const { name, version } = await readPackage();
    console.log(`${BG_RED} ${WHITE_BRIGHT(name)} ${GRAY(`v${version}\n`)}`);
  }

  /**
   * Initializes SassifyPro by updating the sassifypro.json configuration file.
   * If the file already exists, it will be overwritten with the updated configuration.
   */

  public static async createSassifyproFile(): Promise<void> {
    const spinner = createSpinner();

    const currentWorkingDirectory = process.cwd();
    const sassifyproConfigPath = join(
      currentWorkingDirectory,
      'sassifypro.json',
    );

    try {
      await access(sassifyproConfigPath);
      const sassifyproConfig = await readAndUpdateConfig();

      const stringifySassifyProConfig = JSON.stringify(
        sassifyproConfig,
        null,
        2,
      );

      await writeFile(sassifyproConfigPath, stringifySassifyProConfig);

      spinner.success({
        text: GREEN('sassifypro.json updated successfully.'),
      });
    } catch (error) {
      const defaultSassifyproConfig = getConfig();
      const stringifySassifyProConfig = JSON.stringify(
        defaultSassifyproConfig,
        null,
        2,
      );

      await writeFile(sassifyproConfigPath, stringifySassifyProConfig);

      spinner.success({
        text: GREEN('sassifypro.json created successfully.'),
      });
    }
  }
}

/**
 * Shortcut for displaying the SassifyPro message and ASCII art logo.
 */
export const { message, version, createSassifyproFile } = Initialize;
