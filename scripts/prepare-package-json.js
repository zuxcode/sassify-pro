import fs from 'fs';
import path from 'path';

const pathFile = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(pathFile, 'utf8'));
packageJson.version = '1.0.0';
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

console.log('Package.json prepared successfully.');
