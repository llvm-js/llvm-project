const Config = require("../src/config");
const Grammar = require("./grammar");
const Token = require("./token");
const tokenType = require("./token.type");

class Lexer {
    line = 1; // line file
    current = 0; // current token

    lexer(source) {
        this.source = source;
        this.ast = [];

        while (this.line - 1 < this.source.length) {
            if (this.source[this.line - 1] == '') {
                this.line++;
            } else {
                for (let index = 0; index < this.source[this.line - 1].length; index++) {
                    if (index == 0) this.current = index;
                    this.scanToken(this.getChar());
                }
    
                this.current = 0;
                this.line++;
            }
        }

        this.ast.push(new Token(tokenType.get('EOF'), '', 0, this.line + 1, ''));
        return this.ast;
    }


    getChar() {
        return this.getLine()[this.current];
    }


    getNextChar() {
        return this.getLine()[this.current + 1];
    }


    getLine() {
        return this.source[this.line - 1];
    }


    addTokenType(type, char) {
        this.ast.push(new Token(type, char ? char : this.getChar(), this.current, this.line, this.getLine()));
    }


    scanToken(char, ignore = false) {
        if (!ignore && Config.config.grammar?.comment.line[0] == char) {
            let comment = Config.config.grammar?.comment.line;
            
            if (comment.length > 1) {
                let index = 0, isComment = true;

                whileComment: while (index < comment.length) {
                    if (this.getLine()[this.current + index] != comment[index]) {
                        isComment = false;
                        break whileComment;
                    } else index++;
                }

                if (isComment) {
                    this.addTokenType(tokenType.get('COMMENT'), this.getLine().slice(this.current));
                    this.current += this.getLine().slice(this.current).length;
                } else this.scanToken(this.getChar(), true);
            } else {
                this.addTokenType(tokenType.get('COMMENT'), this.getLine().slice(this.current));
                this.current += this.getLine().slice(this.current).length;
            }
        }

        else if (['\'', '"'].includes(char)) {
            let quote = ['\'', '"'][['\'', '"'].indexOf(char)];
            let string = quote;
            this.current++;

            while (this.current < this.getLine().length) {
                let char_t = this.getLine()[this.current];
                string += char_t;

                if (char_t == quote) {
                    this.addTokenType(tokenType.get('STRING'), string);
                    break;
                }
                
                else if (this.current == this.getLine().length - 1) {
                    this.__Exception__('String not found', false);
                }
                
                this.current++;
            }

            this.current++;
        }


        else if (/[a-zA-Z]/.test(char)) {
            let identifer = '';

            while (this.current < this.getLine().length) {
                let char_t = this.getLine()[this.current];

                if (/[a-zA-Z]/.test(char_t) || /[0-9]/.test(char_t)) identifer += char_t;
                else {
                    this.addTokenType(tokenType.get('IDENTIFER'), identifer);
                    this.scanToken(char_t);
                    break;
                }
                this.current++;
            }

        }

        else if (/[0-9]/.test(char)) {
            let number = '';

            while (this.current < this.getLine().length) {
                let char_t = this.getLine()[this.current];
                if (/[0-9]/.test(char_t)) number += char_t;
                else {
                    this.addTokenType(tokenType.get('NUMBER'), number);
                    this.scanToken(char_t);
                    break;
                }
                this.current++;
            }
        }

        else if (['\r', '\t', '\n'].includes(char)) {
            this.addTokenType(tokenType.get('WHITESPACE'));
            this.current++;
        }

        else if (char == ' ') {
            this.addTokenType(tokenType.get('SPACE'));
            this.current++;
        } else {
            if (!Config.config.grammar.forbidden.includes(char)) {
                switch (char) {
                    case '(':
                        this.addTokenType(tokenType.get('OPEN_PAREN'));
                        this.current++;
                        break;
                    case ')':
                        this.addTokenType(tokenType.get('CLOSE_PAREN'));
                        this.current++;
                        break;
                    case '[':
                        this.addTokenType(tokenType.get('OPEN_SQUARE_BRACKET'));
                        this.current++;
                        break;
                    case ']':
                        this.addTokenType(tokenType.get('CLOSE_SQUARE_BRACKET'));
                        this.current++;  
                        break;

                    case '.':
                        this.addTokenType(tokenType.get('DOT'));
                        this.current++;
                        break;      
                    case ',':
                        this.addTokenType(tokenType.get('COMMA'));
                        this.current++;
                        break;
                    case ':':
                        this.addTokenType(tokenType.get('COLON'));
                        this.current++;
                        break;
                    case ';':
                        this.addTokenType(tokenType.get('SEMICOLON'));
                        this.current++;
                        break;
                    
                    case '-':
                        this.addTokenType(tokenType.get('MINUS'));
                        this.current++;
                        break;
                    case '+': 
                        this.addTokenType(tokenType.get('PLUS'));
                        this.current++;
                        break;
                    case '*':
                        this.addTokenType(tokenType.get('STAR'));
                        this.current++;
                        break;
                    case '/':
                        this.addTokenType(tokenType.get('SLASH'));
                        this.current++;
                        break;
                    case '%':
                        this.addTokenType(tokenType.get('PRECENT'));
                        this.current++;
                        break;

                    case '$':
                        this.addTokenType(tokenType.get('DOLLAR'));
                        this.current++;
                        break;
                    case '^':
                        this.addTokenType(tokenType.get('CARET'));
                        this.current++;
                        break;
                    case '?':
                        this.addTokenType(tokenType.get('MARK'));
                        this.current++;
                        break;
                    case '#':
                        this.addTokenType(tokenType.get('HASH'));
                        this.current++;
                        break;
                    case '<':
                        this.addTokenType(tokenType.get('OPEN_ANGLE'));
                        this.current++;
                        break;

                    default:
                        if (['high', 'middle'].includes(Config.config.language.level)) {
                            if (char == '=') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('EQUAL_EQUAL'), '==');
                                    this.current += this.getLine().length;
                                } else {
                                    this.addTokenType(tokenType.get('EQUAL'));
                                    this.current++;
                                }
                            }

                            else if (char == '!') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('BANG_EQUAL'), '!=');
                                    this.current += this.getLine().length;
                                } else {
                                    this.addTokenType(tokenType.get('BANG'));
                                    this.current++;
                                }
                            }
                            
                            else if (char == '>') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('LESS_EQUAL'), '>=');
                                    this.current += this.getLine().length;
                                } else {
                                    this.addTokenType(tokenType.get('CLOSE_ANGLE'));
                                    this.current++;
                                }
                            }
                        }
                        
                        else {
                            this.__Exception__('Invalid char');
                        }
                }
            }  else {
                this.__Exception__('Invalid char');
            }
        }
    }


    __Exception__(message, charView = true) {
        console.log(`[${this.line}:${this.current}] ${message} ${charView ? `'${this.getChar()}'` : ''}`);
        console.log(`${this.line} | ${this.getLine()}`);
        console.log(`${' '.repeat(String(this.line).length)} | ${' '.repeat(this.current)}^${'-'.repeat(this.getLine().trimEnd().length - this.current - 1)}`);
        process.exit();
    }
}

module.exports = Lexer;