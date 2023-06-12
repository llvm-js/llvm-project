/* It's a class that throws an exception */
class Exception {
    /**
     * The function takes a message as an argument and writes it to the console.
     * @param message - The message to be displayed to the user.
     */
    constructor(message){
        this.message = message;
        process.stdout.writable(this.message);
        process.exit(1);
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


module.exports = {
    Exception,
    FileException,
    FileNotFoundException,
    FileAlreadyExistsException,
    DirectoryNotFoundException,
    IOException,
    CallableException
}