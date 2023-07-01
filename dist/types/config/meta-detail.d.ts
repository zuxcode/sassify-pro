#!/usr/bin/env node;
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
