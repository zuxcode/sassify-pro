# SassifyPro

SassifyPro is a powerful Sass compiler designed to revolutionize your web development workflow.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![pages-build-deployment](https://github.com/Codeauthor1/sassifypro/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Codeauthor1/sassifypro/actions/workflows/pages/pages-build-deployment)
[![Build](https://github.com/Codeauthor1/sassifypro/actions/workflows/node.js.yml/badge.svg)](https://github.com/Codeauthor1/sassifypro/actions/workflows/node.js.yml)

![SassifyPro](./banner.png)

## Installation

To install SassifyPro, follow these steps:

1. Ensure that you have Node.js and npm (Node Package Manager) installed on your machine.
1. Open your terminal or command prompt.
1. Run the following command:

```bash
npm install -g sassify-pro
```

## Getting Started

Once you have SassifyPro installed, you can start using it to compile your Sass/SCSS files. Follow these steps to get started:

1. Open your terminal or command prompt.
1. Navigate to the root directory of your project.
1. Run the following command:

```bash
npm run sassify-pro compile [input-file] [output-file]
```

Replace `[input-file]` with the path to your Sass/SCSS file and `[output-file]` with the desired path and name for the compiled CSS file.

For example:

```bash
npm run sassify-pro compile src/main.scss dist/style.css
```

This will compile the `main.scss` file located in the `src` directory and save the compiled CSS file as style.css in the `dist` directory.

## Features

### Watch Mode

SassifyPro provides a convenient watch mode that automatically re-compiles your Sass/SCSS files whenever changes are detected. To use the watch mode, run the following command:

```bash
npm run sassify-pro watch [input-directory] [output-directory]
```

Replace `[input-directory]` with the path to your Sass/SCSS source directory and `[output-directory]` with the path to your desired output directory for the compiled CSS files.

For example:

```bash
npm run sassify-pro watch src/ dist/

```

This will watch the `src` directory for any changes to Sass/SCSS files and compile them into the `dist` directory.

## Source Maps

SassifyPro supports generating source maps to facilitate easier debugging of your CSS in development. To enable source maps, use the `--source-map` flag when compiling your Sass/SCSS files:

```bash
npm run sassify-pro compile --source-map [input-file] [output-file]

```

For example:

```bash
npm run sassify-pro compile --source-map src/main.scss dist/style.css

```

This will generate a source map file alongside the compiled CSS file.

## Import Paths

If you have Sass/SCSS files located in different directories and need to import them using relative paths, SassifyPro allows you to define import paths. You can specify the import paths using the `--import-path` flag:

```bash
 sassify-pro compile --import-path [path] [input-file] [output-file]
```

For example:

```bash
sassify-pro compile --import-path src/scss src/main.scss dist/style.css
```

This will add the `src/scss` directory as an import path, allowing you to import Sass/SCSS files from that directory using relative paths.

## Configuration

SassifyPro supports configuration through a `.sassifyprorc` file in JSON format. You can place this file in the root directory of your project to define default options for SassifyPro.

Here's an example `.sassifyprorc` file:

```json
{
  "sourceDir": "src",
  "outputDir": "dist",
  "sourceMap": true,
  "importPaths": ["src/scss"]
}
```

With this configuration file present, you can omit certain options when running SassifyPro commands.

## Documentation

For detailed documentation on using SassifyPro, please refer to the [official documentation.](https://github.com/Codeauthor1/sassify-pro#readme)

## Contributing

We welcome contributions to SassifyPro! If you find any issues or have suggestions for improvements, please submit them in the[ issue tracker](https://github.com/Codeauthor1/sassify-pro/issues).

To contribute code changes, please follow our [contribution guidelines](https://github.com/Codeauthor1/sassify-pro/contribute).

## License

SassifyPro is licensed under the [MIT License.](https://choosealicense.com/licenses/mit/)

## Acknowledgements

- We would like to express our gratitude to the open source community for their invaluable contributions, which made the development of SassifyPro possible.

## Support

If you need any assistance or have any questions, please contact our support team at sassifypro@gmail.com.

Thank you for choosing SassifyPro! We hope it enhances your Sass/SCSS development workflow and helps you write cleaner and more maintainable CSS.
