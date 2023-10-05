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
    /**
     * The constructor function is a special function that is called when a new object is created
     * @param message - The message that will be displayed when the error is thrown.
     */
    constructor(message){
        super(message);
        this.message = "File not found in the filesystem";
        process.stdout.writable(this.message);
    }
}


class FileAlreadyExistsException extends Exception {
    constructor(message){
        super(message);
        this.message = "File already exists in the filesystem";
        process.stdout.writable(this.message);
    }
}


class DirectoryNotFoundException extends Exception {
    constructor(message){
        super(message);
        this.message = "Directory not found";
        process.stdout.writable(this.message);
    }
}

class IOException extends Exception {
    constructor(message){
        super(message);
        this.message = "IOException not available";
        process.stdout.writable(this.message);
    }
}

class CallableException extends Exception {
    constructor(message){
        super(message);
        this.message = "CallableException not available";
        process.stdout.writable(this.message);
    }
}


class TokenException extends Exception {
    constructor(message, token, view) {
        super(message, false);

        console.log(`[${token.line}:${token.current}] ${message} ${view ? `"${token.lexem}"` : ''}`);
        console.log(`${token.line} | ${token.code}`);

        let current = token.current - token?.lexem?.length;
        console.log(`${' '.repeat(String(token.line).length)} | ${' '.repeat(current)}^${'-'.repeat(token.lexem.length - 1)}`);
    }
}


class ExpressionException {
    constructor(source, message, line, index) {
        let lastLine = `${Color.FG_GRAY}${' '.repeat(String(line).length)} |\t\n`;
        let middleLine = `${line} |\t`;
        let nextLine = `${Color.BRIGHT}${Color.FG_GRAY}${' '.repeat(String(line).length)} |\t${' '.repeat(index)}${Color.FG_RED}^-${Color.FG_WHITE}\n`;

        process.stdout.write(`${Color.BRIGHT}${Color.BRIGHT}[${Color.FG_RED}ExpressionException${Color.FG_WHITE}]: ${message}\n`);
        process.stdout.write(lastLine);
        process.stdout.write(`${middleLine}${source}\n`);
        process.stdout.write(nextLine);
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
    TokenException
}