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