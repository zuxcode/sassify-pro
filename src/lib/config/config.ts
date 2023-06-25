import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

class Config {
  program: Command;

  name: Command;

  version: Command;

  filePath: string;

  packageJson: JSON;

  constructor() {
    this.filePath = path.resolve(process.cwd(), 'package.json');
    this.packageJson = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    this.program = new Command();
    this.name = this.program.name('SassifyPro');
    this.version = this.program.version('SassifyPro');
  }
}
export default Config;
