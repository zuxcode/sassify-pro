#!/usr/bin/env node;
import Compiler from '../compile.js';
class Config {
    authorName;
    authorEmail;
    authorUrl;
    packageName;
    version;
    description;
    compiler = new Compiler().compiler();
    constructor() {
        this.authorEmail = 'codeauthor2000@gmail.com';
        this.authorName = 'CodeAuthor1';
        this.authorUrl = 'https://www.twitter.com/codeauthor1';
        this.packageName = 'sassify-pro';
        this.version = '1.0.0';
        this.description = 'SassifyPro is a powerful Sass/SCSS compiler designed to streamline your CSS development process by compiling Sass/SCSS (Syntactically Awesome Style Sheets) into efficient and browser-compatible CSS code. It provides an intuitive command-line interface and a wide range of features to enhance your productivity and maintainability.';
    }
}
export default Config;
