import Config from '../config/config.js';
declare class Init extends Config {
    private clear;
    constructor(clear?: boolean);
    initialize(): void;
}
export default Init;
