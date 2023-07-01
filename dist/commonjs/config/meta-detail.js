#!/usr/bin/env node;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compile_js_1 = __importDefault(require("../compile.js"));
class Config {
    authorName;
    authorEmail;
    authorUrl;
    packageName;
    version;
    description;
    compiler = new compile_js_1.default().compiler();
    constructor() {
        this.authorEmail = 'codeauthor2000@gmail.com';
        this.authorName = 'CodeAuthor1';
        this.authorUrl = 'https://www.twitter.com/codeauthor1';
        this.packageName = 'sassify-pro';
        this.version = '1.0.0';
        this.description = 'SassifyPro is a powerful Sass/SCSS compiler designed to streamline your CSS development process by compiling Sass/SCSS (Syntactically Awesome Style Sheets) into efficient and browser-compatible CSS code. It provides an intuitive command-line interface and a wide range of features to enhance your productivity and maintainability.';
    }
}
exports.default = Config;
