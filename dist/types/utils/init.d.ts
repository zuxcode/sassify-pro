import Config from '../config/meta-detail.js';
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
