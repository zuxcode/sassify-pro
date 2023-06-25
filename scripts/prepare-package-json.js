// Import the fs module to read and write files
import fs from 'fs';
import path from 'path';

// Read the contents of the package.json file
const pathFile = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(pathFile, 'utf8'));
// // Modify the packageJson object as needed
packageJson.version = '1.0.0';
// Write the modified packageJson back to package.json file
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

console.log('Package.json prepared successfully.');
