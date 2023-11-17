export declare enum  TokenType  {
    number, identifer, string, comment,
    open_paren, close_paren, 
    open_angle, close_angle,
    string_quote, string_double_quote,
    minus, plus,
    dot, comma,
    whitespace,
    star,
    equal, bang_equal,
    slash, space,
    semicolon,
    eof
}


export declare class Token {
    type: TokenType;
    lexem: any;
    current: number;
    line: number;
    code: string;
}


export declare class llvm {
    run(): void;
    configVisible(boolean: boolean): void;
    getConfig(): object;
    repl(cb: Function): any;
}


export declare class Grammar {
    static verifyGrammar(current: number, ast: Array, grammar: Array, strict: boolean): object;
    static verifyGrammarNoStrict(current: number, ast: Array, grammar: Array): object;
}


export declare interface IConfig {
    language: {
        name: string,
        version: string,
        extension: string,
        style: 'high' |'low'
    }
}


export declare class Config {
    static config: IConfig;
    set(object: IConfig): any;
    static setCommentLine(string: string): void;
    static forbiddenSymbol(char: string): void;
    static setCommentBlock(string: string): void;
    static setCommentBlock(string: string[]): void; 
    static clearCommentLine(): void;
    static clearCommentBlock(): void;
    static setSupportNumberSnake(bool: boolean): void;
    static clearSupportNumberSnake(): void;
}

export declare class Keywords {
    static is(keyword: string): boolean;
    static put(keyword: string | string[]): void;
    static cut(keyword: string | string[]): void;
}

export declare interface IToken {
    name: string,
    lexem: string
}

export declare class Tokens {
    static is(lexem: string): boolean;
    static put(token: IToken): void;
    static cut(tokenName: string | string[]): void;
}

export * from '@llvm.js/llvm';