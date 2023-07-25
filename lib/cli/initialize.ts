import figlet from 'figlet';
import {
  bgRed, gray, green, whiteBright,
} from 'colorette';
import { writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { createSpinner } from 'nanospinner';

import { readPackage } from '../utils/package.js';
import { readAndUpdateConfig } from '../config/read-and-update-config.js';
import { getConfig } from './sass-options.js';

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
      bgRed('#ff0000'),
      whiteBright(` ${name} `),
      gray(`v${version} by ${author.match(/^codeauthor1/)}`),
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
  public static async version(): Promise<void> {
    const { name, version } = await readPackage();

    console.log(
      bgRed('#ff0000'),
      whiteBright(` ${name} `),
      gray(`v${version}`),
    );
  }

  /**
   * Initializes SassifyPro by updating the sassifypro.json configuration file.
   * If the file already exists, it will be overwritten with the updated configuration.
   */
  public static async CreateSassifyproFile(): Promise<void> {
    const spinner = createSpinner();

    const currentWorkingDirectory = process.cwd();

    const sassifyproConfigPath = join(
      currentWorkingDirectory,
      'sassifypro.json',
    );

    access(sassifyproConfigPath)
      .then(async () => {
        const sassifyproConfig = await readAndUpdateConfig();

        const stringifySassifyProRc = JSON.stringify(sassifyproConfig, null, 2);

        writeFile(sassifyproConfigPath, stringifySassifyProRc);

        spinner.success({
          text: green('sassifyprorc.json updated successfully.'),
        });
      })
      .catch(async () => {
        const defaultSassifyproConfig = getConfig();

        const stringifySassifyProRc = JSON.stringify(
          defaultSassifyproConfig,
          null,
          2,
        );

        await writeFile(sassifyproConfigPath, stringifySassifyProRc);

        spinner.success({
          text: green('sassifyprorc.json created successfully.'),
        });
      });
  }
}

/**
 * Shortcut for displaying the SassifyPro message and ASCII art logo.
 */
export const { message, version, CreateSassifyproFile } = Initialize;
