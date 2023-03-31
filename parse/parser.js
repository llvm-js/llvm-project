class Parser {
    /**
     * If the character is a backslash, slash, quote, open/close paren, brace, bracket, angle,
     * semicolon, comma, colon, dot, digit, or operator, return the character and its type. Otherwise,
     * return the character and its type as an identifier.
     * @param char - The character to parse.
     * @returns An object with two properties: value and type.
     */
    static _parseSymbol(char){
        if (char === '\\') return { value: char, type: 'backslash' };
        if (char === '/') return { value: char, type: 'slash' };
        if (char === '"') return { value: char, type: 'quote-string' };
        if (char === "'") return { value: char, type: 'quote-string' };
        if (char === '(') return { value: char, type: 'open-paren' };
        if (char === ')') return { value: char, type: 'close-paren' };
        if (char === '{') return { value: char, type: 'open-brace' };
        if (char === '}') return { value: char, type: 'close-brace' };
        if (char === '[') return { value: char, type: 'open-bracket' };
        if (char === ']') return { value: char, type: 'close-bracket' };
        if (char === '<') return { value: char, type: 'open-angle' };
        if (char === '>') return { value: char, type: 'close-angle' };
        if (char === ';') return { value: char, type: 'semicolon' };
        if (char === ',') return { value: char, type: 'comma' };
        if (char === ':') return { value: char, type: 'colon' };
        if (char === '.') return { value: char, type: 'dot' };
        if (/[0-9]/.test(char)) return { value: char, type: 'digit' };
        if (/[-+]/.test(char)) return { value: char, type: 'operator' };
        return { value: char, type: 'identifier' };
    }


    /**
     * It takes a string of code and returns an object that represents the code.
     * The object is called an Abstract Syntax Tree (AST).
     * The AST is a tree structure that represents the code
     * @param code - The code to be parsed.
     * @returns The parseExpression method is returning an object with two properties: type and body.
     * The type property is set to the string 'expression' and the body property is set to an array.
     */
    static parseExpression(code) {
        let ast = { type: 'expression', body: [] };

        for (var i = 0; i < code.length; i++) {
           if (code[i] === undefined) continue;
            ast['body'][i] = this._parseSymbol(code[i]);
        }

        return ast;
    }
}


module.exports = Parser;