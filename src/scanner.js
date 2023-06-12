const Token = require("./token");
const TokenType = require("./tokentype");
const Language = require("./language");


class Scanner {
    #source;
    #tokens = new Array();

    start = 0;
    current = 0;
    line = 1;

    constructor(source) {
        this.#source = source;
    }

    isAtEnd() {
        return this.current >= this.#source.length;
    }

    scanTokens() {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        this.#tokens.push(new Token(TokenType.EOF, "", null, this.line));
        return this.#tokens;
    }

    advance() {
        return this.#source.charAt(this.current++) || '';
    }

    addTokenType(type) {
        this.addToken(type, null);
    }

    addToken(type, literal) {
        let text = this.#source.substring(this.start, this.current);
        this.#tokens.push(new Token(type, text, literal,this.line));
    }

    scanToken() {
        let char = this.advance();

        switch (char) {
          case '(': this.addTokenType(TokenType.LEFT_PAREN); break;
          case ')': this.addTokenType(TokenType.RIGHT_PAREN); break;
          case '{': this.addTokenType(TokenType.LEFT_BRACE); break;
          case '}': this.addTokenType(TokenType.RIGHT_BRACE); break;
          case ',': this.addTokenType(TokenType.COMMA); break;
          case '.': this.addTokenType(TokenType.DOT); break;
          case '-': this.addTokenType(TokenType.MINUS); break;
          case '+': this.addTokenType(TokenType.PLUS); break;
          case ';': this.addTokenType(TokenType.SEMICOLON); break;
          case '*': this.addTokenType(TokenType.STAR); break;

          default:
                Language.error(this.line, "Unexpected character.");
                break;
        }
    }
}

module.exports = Scanner;