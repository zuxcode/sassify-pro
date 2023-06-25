// Import the fs module to read and write files
import fs from 'fs';
import path from 'path';

// Read the contents of the package.json file
const pathFile = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(pathFile, 'utf8'));
// // Modify the packageJson object as needed
packageJson.author = {
  name: 'codeauthor1',
  email: 'codeauthor2000@gmail.com',
  url: 'https://www.twitter.com/codeathor1',
};

// // Write the modified packageJson back to package.json file
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

console.log('Package.json prepared successfully.');
