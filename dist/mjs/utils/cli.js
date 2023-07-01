import meow from 'meow';
import meowHelp from 'cli-meow-help';
class CLI {
    flags;
    commands;
    constructor() {
        this.flags = {
            clear: {
                type: 'boolean',
                default: true,
                alias: 'c',
                desc: 'Clear the console',
            },
            noClear: {
                type: 'boolean',
                default: false,
                desc: "Don't clear the console",
            },
            debug: {
                type: 'boolean',
                default: false,
                alias: 'd',
                desc: 'Print debug info',
            },
            version: {
                type: 'boolean',
                alias: 'v',
                desc: 'Print CLI version',
            },
        };
        this.commands = {
            help: { desc: 'Print help info' },
        };
    }
    run() {
        const helpText = meowHelp({
            name: 'demo-cli',
            flags: this.flags,
            commands: this.commands,
        });
        const options = {
            inferType: true,
            description: false,
            hardRejection: false,
            flags: this.flags,
        };
        const result = meow(helpText, options);
        // Do something with the parsed command-line input
        console.log(result.input);
        console.log(result.flags);
        return result;
    }
}
export default CLI;
