class Token {
    constructor(type, lexem, current, line, code = '') {
        this.type = type;
        this.lexem = lexem;
        this.current = current;
        this.line = line;
        this.code = code;
    }
}

module.exports = Token;