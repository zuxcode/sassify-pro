import Config from '../config/config.js';
/**
 * @class Intit
 * @extends Config
 */
declare class Init extends Config {
    private clear;
    constructor(clear?: boolean);
    initialize(): void;
}
export default Init;
