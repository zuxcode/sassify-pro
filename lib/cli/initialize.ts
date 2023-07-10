import figlet from 'figlet';
import chalk from 'chalk';

import PackageJson from '../utils/pkg.js';

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
}

export const { message, version } = Initialize;
