const { IdentiferLexem } = require("./lexer/lexem");
const Parser = require("./parse/parser");

let expression = Parser.parseExpression('(a + b) + 45 + 4d');

expression.body.forEach(token => {
    if (token.type instanceof IdentiferLexem) console.log(token.type.type);
});