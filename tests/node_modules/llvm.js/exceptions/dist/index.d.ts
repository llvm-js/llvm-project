import { Token } from '../../llvm/dist';

interface ExceptionConstructor {
    new(message: string): void;
    new(): void;
}

export declare class Exception implements ExceptionConstructor {}
export declare class FileException extends Exception {}
export declare class FileNotFoundException extends Exception {}
export declare class FileAlreadyExistsException extends Exception {}
export declare class DirectoryNotFoundException extends Exception {}
export declare class IOException extends Exception {}
export declare class CallableException extends Exception {}


export declare class TokenException extends Exception {
    // new(message: string, token: object, view: boolean): void;
    constructor(message: string, token: Token, exceptionType: string = 'ExpressionException'): void;
}


export declare class ExpressionException {
    // new(source, message: string, line, index): void;
    constructor(message: string, token: Token, exceptionType: string = 'ExpressionException'): void;
}


export declare class TracewayException {
    constructor(message: string, configuration: object, exceptionType: string = 'ExpressionException'): void;
}

export * from '@llvm.js/exceptions';