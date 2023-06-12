const fs = require('fs');
const Scanner = require("./scanner");

class Language {
    static hadError = false;

    constructor(args) {
        if (args.length > 1) {
            process.stdout.write('Usage: lang [script]');
            process.exit(64);
        } else if (args.length == 1) {
            this.runFile(args[0]);
        } else {
            this.runPrompt();
        }
    }

    run(source) {
        let scanner = new Scanner(source);
        let tokens = scanner.scanTokens();
        for (const token of tokens) console.log(token);
    }

    runFile(path) {
        let bytes = fs.readFileSync(path, 'utf8');
        this.run(new String(bytes));
        if (this.hadError) process.exit(64);
    }

    runPrompt() {
        for (;;) {
            let line = process.stdin.read();
            process.stdin.setEncoding('utf8');
            process.stdout.write('> ');
            let run = (source) => this.run(source);

            process.stdin.on('data', function(data) {
                line = data;
                run(line);
                this.hadError = false;
                process.exit();
            });
        
            if (line == null) break;
        }
    }

    static error(line, message) {
        this.reportError(line, "", message);
    }

    static reportError(line, where, message) {
        process.stdout.write(`line [${line}] Error ${where}: ${message}`);
        this.hadError = true;
    }
}


argv = process.argv;
argv.pop();
argv.pop();
new Language(argv);

module.exports = Language;