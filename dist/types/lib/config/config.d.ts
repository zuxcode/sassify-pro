#!/usr/bin/env node;
/**
 * @author codeAuthor1
 * @package sassify-pro
 * @version 1.0.0
 * @class Config
 * @protected packageJsonSnapshot. it holds a snapshot of the package.json file.
 * @constructor `this.packageJsonSnapshot.version: string`.
 * stores the current version of sassify-pro
 * @classdesc configuration File.
 */
declare class Config {
    readonly authorName: string;
    readonly authorEmail: string;
    readonly authorUrl: string;
    readonly packageName: string;
    readonly version: string;
    readonly description: string;
    compiler: void;
    constructor();
}
export default Config;
