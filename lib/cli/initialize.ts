import figlet from 'figlet';
import chalk from 'chalk';

import { existsSync, readFile, writeFile } from 'fs';
import { join } from 'node:path';
import { createSpinner } from 'nanospinner';
import PackageJson from '../utils/pkg.js';
import { readConfig } from '../config/read-config.js';

export default class Initialize {
  public static message() {
    const pkg = PackageJson.readPkg();
    console.log(
      chalk.bgHex('#ff0000').whiteBright(` ${pkg.name} `),
      chalk.gray(`v${pkg.version} by ${pkg.author.match(/^codeauthor1/)}`),
    );
    console.log(
      figlet.textSync(pkg.name, {
        font: 'Banner3',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 150,
        whitespaceBreak: true,
      }),
    );
  }

  public static version() {
    const pkg = PackageJson.readPkg();

    console.log(
      chalk.bgHex('#ff0000').whiteBright(` ${pkg.name} `),
      chalk.gray(`v${pkg.version}`),
    );
  }

  public static sassifyproInit() {
    const spinner = createSpinner().start({
      text: 'Initializing sassifypro.json',
      color: 'green',
    });
    const configPath = join(process.cwd(), 'sassifypro.json');

    if (existsSync(configPath)) {
      readFile(configPath, 'utf8', (err, data) => {
        if (err) {
          spinner.error({ text: chalk.red('Error reading sassifypro.json: ') });
          console.error(err);
        }

        try {
          const existingConfigSettings = JSON.parse(data);

          readConfig((error, config) => {
            if (error) console.log(error);

            const updatedData = { ...existingConfigSettings, ...config };

            const updatedJsonData = JSON.stringify(updatedData, null, 2);

            writeFile(configPath, updatedJsonData, 'utf8', (e: Error) => {
              if (e) {
                spinner.error({
                  text: chalk.red('Error updating sassifypro.json: '),
                });
                console.error(e);
              }
            });

            spinner.success({
              text: chalk.green(
                'sassifypro.json has been updated successfully.',
              ),
            });
          });
        } catch (parseError) {
          spinner.error({
            text: chalk.red('Error parsing existing sassifypro.json:'),
          });
          console.error(parseError);
        }
      });
    } else {
      readConfig((error, data) => {
        if (error) console.log(error);

        const jsonData = JSON.stringify(data, null, 2);

        writeFile(configPath, jsonData, 'utf8', (err) => {
          if (err) {
            spinner.error({
              text: chalk.red('Error creating sassifypro.json:'),
            });

            console.error(err);
          }
        });
        spinner.success({
          text: chalk.green('sassifypro.json has been created successfully.'),
        });
      });
    }
  }
}

export const { message, version, sassifyproInit } = Initialize;
