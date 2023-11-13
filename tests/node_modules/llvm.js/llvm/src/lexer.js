const Config = require("../src/config");
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


    clearComments(source, isLexer = false) {
        source = isLexer ? this.lexer(source) : source;
        source = source.filter(tree => tree instanceof Token && !['COMMENT', 'COMMENT_BODY'].includes(tree.type));

        let [content, currentLine, currentLineIndex, index] = [[], source[0]?.line, 0, 0];

        for (const token of source) {
            if (currentLine != token.line) {
                currentLine = token.line;
                currentLineIndex += 1;
            }

            if (content[currentLineIndex] == undefined) content[currentLineIndex] = '';
            content[currentLineIndex] += token.lexem;
            index++;
        }

        return content.join('\n');
    }


    clearCommentTokens(ast) {
        return ast.filter(tree =>  tree instanceof Token && !['COMMENT', 'COMMENT_BODY'].includes(tree.type));
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


    addTokenType(type, char, current) {
        this.ast.push(new Token(type, char ? char : this.getChar(), current != undefined ? current : this.current, this.line, this.getLine()));
    }


    isStartCommentBlock() {
        let comment = Config.config.grammar?.comment.block;
        let start = typeof comment === 'string' ? comment : comment[0];

        if (this.getLine().length != this.current)
            return this.getLine().slice(this.current, this.current + start.length) == start;
        return false;
    }


    isEndCommentBlock() {
        let comment = Config.config.grammar?.comment.block;
        let end = typeof comment === 'string' ? comment.split('').reverse().join('') : comment[1];

        if (this.getLine() == undefined) return false;
        if (this.getLine().slice(this.current, this.current + end.length) != '')
            return this.getLine().slice(this.current, this.current + end.length) == end;
        return false;
    }


    scanToken(char, ignore = false) {
        if (!ignore && this.isStartCommentBlock(char)) {
            let comment = Config.config.grammar?.comment.block;
            let sizeEndCommentBlock = (typeof comment === 'string' ? comment.split('').reverse().join('') : comment[1]).length;
            let commentBlock = [new Token('COMMENT_BODY', this.getLine().slice(this.current, this.current + sizeEndCommentBlock), this.current, this.line, this.getLine())];
            this.current += (typeof comment === 'string' ? comment : comment[0]).length;
            let bufCurrent = this.current;

            while (!this.isEndCommentBlock()) {
                this.current++;

                if (this.getLine() == undefined) {
                    this.current = 0;
                    this.line--;
                    this.__Exception__('End of block comment not found', false);
                }
 
                if (this.getLine().length == this.current) {
                    commentBlock.push(new Token('COMMENT_BODY', this.getLine().slice(bufCurrent), this.current, this.line, this.getLine()));
                    bufCurrent = undefined;
                    this.current = 0;
                    this.line++;
                }
            }
            
            commentBlock.push(new Token('COMMENT_BODY', this.getLine().slice(0, this.current + sizeEndCommentBlock), this.current, this.line, this.getLine()));
            this.current += sizeEndCommentBlock;
            
            if (commentBlock.length == 2) {
                commentBlock = [
                    new Token('COMMENT_BODY', 
                    commentBlock[0].code.slice(commentBlock[0].current, commentBlock[1].current + sizeEndCommentBlock), 
                    commentBlock[0].current, commentBlock[0].line, commentBlock[0].code)
                ];
            }

            this.ast.push(...commentBlock);
        }


        else if (!ignore && Config.config.grammar?.comment.line[0] == char) {
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
            let currentBuffer = this.current;
            this.current++;

            while (this.current < this.getLine().length) {
                let char_t = this.getLine()[this.current];
                string += char_t;

                if (char_t == quote) {
                    this.addTokenType(tokenType.get('STRING'), string, currentBuffer);
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
            let currentBuffer = this.current;

            while (this.current < this.getLine().length) {
                const char_t = this.getLine()[this.current];
                
                if (this.current == this.getLine().length - 1) {
                    if (/[a-zA-Z]/.test(char_t) || /[0-9]/.test(char_t)) {
                        this.addTokenType(tokenType.get('IDENTIFER'), identifer + char_t, currentBuffer);
                        this.current++;
                        break;
                    } else {
                        this.addTokenType(tokenType.get('IDENTIFER'), identifer, currentBuffer);
                        this.scanToken(char_t);
                        break;
                    }
                } 
                
                else if (/[a-zA-Z]/.test(char_t) || /[0-9]/.test(char_t)) {
                    identifer += char_t;
                } else {
                    this.addTokenType(tokenType.get('IDENTIFER'), identifer, currentBuffer);
                    this.scanToken(char_t);
                    break;
                }

                this.current++;
            }

        }

        else if (/[0-9]/.test(char)) {
            let number = '';
            let countDot = 0;

            while (this.current < this.getLine().length) {
                const char_t = this.getLine()[this.current];

                if (this.current == this.getLine().length - 1) {
                    function is() {
                        if (/[0-9]/.test(char_t)) {
                            return true;
                        } else if (char_t == '_') {
                            let previousToken = this.getLine()[this.current - 1];
                            let nextToken = this.getLine()[this.current + 1];
                            
                            if (Config.config.syntax.supportNumberStyleSnakeCase == false) {
                                return false;
                            } else {
                                return [previousToken == '.', nextToken == '.'].includes(true);
                            }
                        } else if (char_t == '.') {
                            return countDot < 1;
                        }
                    }

                    if (is.call(this)) {
                        this.addTokenType(tokenType.get('NUMBER'), number + char_t, this.current - number.length);
                        this.current++;
                        break;
                    } else {
                        this.addTokenType(tokenType.get('NUMBER'), number, this.current - number.length);
                        this.scanToken(char_t);
                        break;
                    }
                }

                else if (/[0-9]/.test(char_t)) {
                    number += char_t;
                } else if (char_t == '_') {
                    let previousToken = this.getLine()[this.current - 1];
                    let nextToken = this.getLine()[this.current + 1];

                    if (Config.config.syntax.supportNumberStyleSnakeCase == false) {
                        this.addTokenType(tokenType.get('NUMBER'), number, this.current - number.length);
                        this.scanToken(char_t);
                        break;
                    } else if ([previousToken == '.', nextToken == '.'].includes(true)) {
                        this.addTokenType(tokenType.get('NUMBER'), number, this.current - number.length);
                        this.scanToken(char_t);
                        break;
                    } else {
                        number += char_t;
                    }
                } else if (char_t == '.') {
                    if (countDot == 1) {
                        this.addTokenType(tokenType.get('NUMBER'), number, this.current - number.length);
                        this.scanToken(char_t);
                        break;
                    }

                    number += char_t;
                    countDot++;
                } else {
                    this.addTokenType(tokenType.get('NUMBER'), number, this.current - number.length);
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

                    case '_':
                        this.addTokenType(tokenType.get('UNDERSCORE'));
                        this.current++;
                        break;
                    case '@':
                        this.addTokenType(tokenType.get('DOGE'));
                        this.current++;
                        break;
                    case '$':
                        this.addTokenType(tokenType.get('DOLLAR'));
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

                    default:
                        if (['high', 'middle'].includes(Config.config.language.level)) {
                            if (char == '=') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('EQUAL_EQUAL'), '==');
                                    this.current += 2;
                                } else {
                                    this.addTokenType(tokenType.get('EQUAL'));
                                    this.current++;
                                }
                            }

                            else if (char == '!') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('BANG_EQUAL'), '!=');
                                    this.current += 2;
                                } else {
                                    this.addTokenType(tokenType.get('BANG'));
                                    this.current++;
                                }
                            }
                            
                            else if (char == '>') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('GREATER_EQUAL'), '>=');
                                    this.current += 2;
                                } else {
                                    this.addTokenType(tokenType.get('GREATER'));
                                    this.current++;
                                }
                            }

                            else if (char == '<') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('LESS_EQUAL'), '<=');
                                    this.current += 2;
                                } else {
                                    this.addTokenType(tokenType.get('LESS'));
                                    this.current++;
                                }
                            }

                            else if (char == '+') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('PLUS_EQUAL'), '+=');
                                    this.current += 2;
                                } else {
                                    this.addTokenType(tokenType.get('PLUS'));
                                    this.current++;
                                }
                            }

                            else if (char == '-') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('MINUS_EQUAL'), '-=');
                                    this.current += 2;
                                } else {
                                    this.addTokenType(tokenType.get('MINUS'));
                                    this.current++;
                                }
                            }

                            else if (char == '*') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('STAR_EQUAL'), '*=');
                                    this.current += 2;
                                } else {
                                    this.addTokenType(tokenType.get('STAR'));
                                    this.current++;
                                }
                            }

                            else if (char == '/') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('SLASH_EQUAL'), '/=');
                                    this.current += 2;
                                } else {
                                    this.addTokenType(tokenType.get('SLASH'));
                                    this.current++;
                                }
                            }

                            else if (char == '%') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('PERCENT_EQUAL'), '%=');
                                    this.current += 2;
                                } else {
                                    this.addTokenType(tokenType.get('PERCENT'));
                                    this.current++;
                                }
                            }

                            else if (char == '^') {
                                if (this.getNextChar() == '=') {
                                    this.addTokenType(tokenType.get('CARET_EQUAL'), '^=');
                                    this.current += 2;
                                } else {
                                    this.addTokenType(tokenType.get('CARET'));
                                    this.current++;
                                }
                            }

                            else if (char == '|') {
                                if (this.getNextChar() == '|') {
                                    this.addTokenType(tokenType.get('OPERATOR_OR'), '||');
                                    this.current += 2;
                                } else {
                                    this.addTokenType(tokenType.get('PIPE'));
                                    this.current++;
                                }
                            }

                            else if (char == '&') {
                                if (this.getNextChar() == '&') {
                                    this.addTokenType(tokenType.get('OPERATOR_AND'), '&&');
                                    this.current += 2;
                                } else {
                                    this.addTokenType(tokenType.get('AMPERSAND'));
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