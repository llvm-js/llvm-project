# LLVM.JS (llvm.js)

# Install

## npm
```sh
npm i llvm.js
```

## git
```
git clone https://github.com/llvm-js/llvm-project.git
```

# Require
```js
const llvm = require('llvm.js/llvm');
const exceptions = require('llvm.js/exceptions');
const expression = require('llvm.js/expression');
const codeGen = require('llvm.js/codegen');
```

# Quick start
```js
const llvm = require('llvm.js/llvm');
const language = new llvm.llvm();

// config (Optional)

let file_c = fs.readFileSync(src).toString('utf8').split('\n');
const lexer = new llvm.Lexer();
let ast = lexer.lexer(file_c);
// console.log(ast); // example

language.run(); // view the characteristics of the programming language and the project  
```
### REPL
```js
language.repl((data) => {
    console.log(data);
});
```

# Example JavaScript compile

## Windows
```
cd ./tests
node language.js
```

## Input file:
```js
// JavaScript --> AsmX MachineCode
let text = "Hello MachineCode AsmX!";
const example = 'this constant section';

// optimized
console.log('call 1');
console.log('call 2');
```

## Output file:
```
segment variable:
    text: "Hello MachineCode AsmX!"

segment const:
    example: 'this constant section'

print:
   push $1
   call 0x04

main code:
    mov $1 'call 1'
    func print
    mov $1 'call 2'
    func print
```

# An example of using llvm.js in [RunKit + npm](https://runkit.com/embed/ohtvvq9khvnx)

JavaScript code:
```js
const fs = require('fs');
const Expression = require('llvm.js/expression');
const codeGen = require('llvm.js/codegen');

let expression = new Expression('2 + 4');
console.log(expression.answer());

codeGen.genSLFunction('print');
codeGen.callFunction('print', '1');
codeGen.codegen('output');

fs.readFileSync('output.bc-asmx').toString('utf8');
```

Output:
```
6

print:
   push $1
   call 0x04

main code:
    mov $1 1
    func print

```


# Documentation

## [@llvm.js/llvm](./documentation/llvm/README.md)

## [@llvm.js/codegen](./documentation/codegen/README.md)

## [@llvm.js/exceptions](./documentation/exceptions/README.md)

## [@llvm.js/expression](./documentation/expression/README.md)