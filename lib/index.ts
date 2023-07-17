#!/usr/bin/env node

import { checkModuleVersion } from './utils/version.js';

checkModuleVersion();

// Modules
export { default as Sassifypro } from './module/sassifypro.js';
export { compileSass } from './module/compiler.js';
export { matchFile } from './module/match-file.js';

// Utils
export { importPath } from './utils/import-path.js';
export { watchSass } from './utils/watch.js';
export { readPackage } from './utils/package.js';

// Config
export { readAndUpdateConfig } from './config/read-and-update-config.js';

// CLI
export { message, version, sassifyproInit } from './cli/initialize.js';
export { getConfig } from './cli/sass-options.js';

// Types
export { SassOptions } from './@types/sass-options.js';
export { Package } from './@types/package.js';

// CLI entry point
export { sassifypro } from './module/sassifypro.js';
