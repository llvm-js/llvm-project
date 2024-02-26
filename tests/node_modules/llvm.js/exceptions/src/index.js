const Config = require("../../llvm/src/config");
const validParameter = require("../../llvm/src/utils/params.validfator");
const Color = require("../../utils/color");

/* It's a class that throws an exception */
class Exception {
    /**
     * The function takes a message as an argument and writes it to the console.
     * @param message - The message to be displayed to the user.
     */
    constructor(message, exit = true){
        this.message = message;
        console.log(this.message);
        exit && process.exit(1);
    }
}


/* It creates a new class called FileException that extends the Exception class. */
class FileException extends Exception {
    constructor(message){
        super(message);
    }
}


class FileNotFoundException extends Exception {
    constructor(){
        super("[FileNotFoundException]: File not found in the filesystem");
    }
}


class FileAlreadyExistsException extends Exception {
    constructor(){
        super("[FileAlreadyExistsException]: File already exists in the filesystem");
    }
}


class DirectoryNotFoundException extends Exception {
    constructor(){
        super("[DirectoryNotFoundException]: Directory not found");
    }
}

class IOException extends Exception {
    constructor(){
        super("[IOException]: IOException not available");
    }
}

class CallableException extends Exception {
    constructor(){
        super("[CallableException]: CallableException not available");
    }
}


class TokenException {
    constructor(message, token, exceptionType = 'TokenException') {
        let symbolUnderscore = Config.config.exception.underscore;
        let startSymbol = symbolUnderscore[0];
        let endSymbol = symbolUnderscore[1] ? symbolUnderscore[1] : symbolUnderscore[0];

        let lastLine = `${Color.FG_GRAY}${token.line - 1}${' '.repeat(String(token.line + 1).length - String(token.line).length)} |\t`;
        let middleLine = `${token.line}${' '.repeat(String(token.line + 1).length - String(token.line).length)} |\t`;
        let nextLine = `${Color.BRIGHT}${Color.FG_GRAY}${token.line + 1} |${Color.FG_RED}\t${' '.repeat(token.current)}${startSymbol}${endSymbol.repeat(token.lexem.length -1)}${Color.RESET}`;

        console.log(`${Color.BRIGHT}${Color.BRIGHT}[${Color.FG_RED}${exceptionType instanceof String ? exceptionType : 'TokenException'}${Color.FG_WHITE}]: ${message}`);
        console.log(lastLine);
        console.log(`${middleLine}${token.code}`);
        console.log(nextLine);

        process.exit();
    }
}


class ExpressionException {
    constructor(message, token, exceptionType = 'ExpressionException') {
        let symbolUnderscore = Config.config.exception.underscore;
        let startSymbol = symbolUnderscore[0];
        let endSymbol = symbolUnderscore[1] ? symbolUnderscore[1] : symbolUnderscore[0];

        let lastLine = `${Color.FG_GRAY}${token.line - 1}${' '.repeat(String(token.line + 1).length - String(token.line).length)} |\t`;
        let middleLine = `${token.line}${' '.repeat(String(token.line + 1).length - String(token.line).length)} |\t`;
        let nextLine = `${Color.BRIGHT}${Color.FG_GRAY}${token.line + 1} |${Color.FG_RED}\t${' '.repeat(token.current)}${startSymbol}${endSymbol.repeat(token.code.length - token.current - (token.code.endsWith('\r') ? 2 : 1))}${Color.RESET}`;

        console.log(`${Color.BRIGHT}${Color.BRIGHT}[${Color.FG_RED}${typeof exceptionType == 'string' ? exceptionType : 'ExpressionException'}${Color.FG_WHITE}]: ${message}`);
        console.log(lastLine);
        console.log(`${middleLine}${token.code}`);
        console.log(nextLine);

        process.exit();
    }
}


class TracewayException {
    constructor(message, configuration, exceptionType = 'Exception') {
        let symbolUnderscore = Config.config.exception.underscore;
        let startSymbol = symbolUnderscore[0];
        let endSymbol = symbolUnderscore[1] ? symbolUnderscore[1] : symbolUnderscore[0];

        console.log(`${Color.BRIGHT}[${Color.FG_RED}${typeof exceptionType == 'string' ? exceptionType : 'Exception'}${Color.FG_WHITE}]: ${message}`);

        if (configuration?.traceway) {
            for (const trace of configuration.traceway) {
                let { token, reason, filepath } = trace;
                let lastLine = `${Color.FG_GRAY}     ${token.line - 1}${' '.repeat(String(token.line + 1).length - String(token.line).length)} |`;
                let middleLine = `-->  ${token.line}${' '.repeat(String(token.line + 1).length - String(token.line).length)} |  `;
                let nextLine = `${Color.BRIGHT}${Color.FG_GRAY}     ${token.line + 1} |${Color.FG_RED}  ${' '.repeat(token.current)}${startSymbol}${endSymbol.repeat(token.code.length - token.current - (token.code.endsWith('\r') ? 2 : 1))}${Color.RESET}`;

                console.log(`${Color.BRIGHT}[${Color.FG_RED}${validParameter(filepath) ? filepath : './'}:${token.line}${Color.FG_WHITE}]: ${reason}`);
                console.log(lastLine);
                console.log(`${Color.FG_RED}${middleLine}${token.code}`);
                console.log(nextLine);
            }
        }

        if (configuration?.endMessage && validParameter(configuration?.endMessage)) {
            console.log(`${Color.BRIGHT}[${Color.FG_RED}${typeof exceptionType == 'string' ? exceptionType : 'Exception'}${Color.FG_WHITE}]: ${configuration.endMessage}${Color.RESET}`);
        }

        process.exit();
    }
}


module.exports = {
    Exception,
    FileException,
    FileNotFoundException,
    FileAlreadyExistsException,
    DirectoryNotFoundException,
    IOException,
    CallableException,
    ExpressionException,
    TokenException,
    TracewayException
}