import figlet from 'figlet';
import {
  bgRed, gray, green, whiteBright,
} from 'colorette';
import { access, writeFile } from 'fs/promises';
import { join } from 'node:path';
import { createSpinner } from 'nanospinner';

import { readPackage } from '../utils/package.js';
import { readAndUpdateConfig } from '../config/read-and-update-config.js';

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
  public static async createSassifyproRCFile(): Promise<void> {
    const configPath = join(process.cwd(), 'sassifyprorc.json');
    const spinner = createSpinner();

    readAndUpdateConfig().then((sassifyproConfig) => {
      const stringifySassifyProRc = JSON.stringify(sassifyproConfig, null, 2);

      if (access(configPath)) {
        writeFile(configPath, stringifySassifyProRc);
        spinner.success({
          text: green('sassifyprorc.json created successfully.'),
        });
      } else {
        writeFile(configPath, stringifySassifyProRc);
        spinner.success({
          text: green('sassifyprorc.json updated successfully.'),
        });
      }
    });
  }
}

/**
 * Shortcut for displaying the SassifyPro message and ASCII art logo.
 */
export const { message, version, createSassifyproRCFile } = Initialize;
