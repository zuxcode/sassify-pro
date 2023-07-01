import meow from 'meow';
declare class CLI {
    private flags;
    private commands;
    constructor();
    run(): meow.Result<any>;
}
export default CLI;
