const Parser = require("./parse/parser");

let expression = Parser.parseExpression('(a + b) + 45 + 4d');
console.log(expression);