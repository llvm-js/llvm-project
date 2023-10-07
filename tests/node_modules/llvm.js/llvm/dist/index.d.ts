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
    static setCommentLine(strin: string): void;
    static forbiddenSymbol(char: string): void;
}

export * from '@llvm.js/llvm';