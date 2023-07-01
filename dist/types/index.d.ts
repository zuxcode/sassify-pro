#!/usr/bin/env node
/**
 * @package SassifyPro
 *
 *  SassifyPro is a powerful Sass/SCSS compiler designed to streamline your CSS
 * development process by compiling Sass/SCSS (Syntactically Awesome Style Sheets) into efficient
 * and browser-compatible CSS code. It provides an intuitive command-line interface and a wide
 * range of features to enhance your productivity and maintainability.
 *
 * @author codeauthor1 <codeauthor2000@gmail.com> (https://www.twitter.com/codeathor1)
 *
 */
declare class SassifyPro {
    private result;
    private flags;
    private cli;
    private init;
    private clear;
    private debug;
    constructor();
    run(): Promise<void>;
}
export default SassifyPro;
