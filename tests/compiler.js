const fs = require("fs");
const llvm = require("llvm.js/llvm");
const grammar = require('./grammar/grammar.json');
const codeGen = require('llvm.js/codegen');
const exceptions = require('llvm.js/exceptions');

class Compiler {
    current = 0;

    run(ast) {
        this.ast = ast;
        let isGrammar, miniast;

        const getMiniAst = () => miniast = ast.slice(...isGrammar.sliceSize).filter(t => t.type !== 'SPACE');
        const endIterator = () => { this.current = isGrammar.sliceSize[1]; isGrammar = null; };
        const exit = () => process.exit();
        const exceptionInvalidToken = (token) => { new exceptions.TokenException('Invalid token', token); exit(); };
        const exception = (msg, token) => { new exceptions.TokenException(msg, token, false); exit(); };

        while (this.current < this.ast.length) {
            if (ast[this.current].lexem == ';') this.current++;

            if (ast[this.current].type == 'EOF') {
                break;
            } else if ((isGrammar = llvm.Grammar.verifyGrammarNoStrict(this.current, this.ast, grammar.VariableDeclaration))) {
                getMiniAst();

                if (miniast[0].lexem == 'let') {
                    codeGen.variableDeclaration(miniast[1], miniast[miniast.length - 1]);
                } else if (miniast[0].lexem == 'const') {
                    codeGen.constDeclaration(miniast[1], miniast[miniast.length - 1]);
                } else {
                    exceptionInvalidToken(this.ast[this.current]);
                }

                endIterator();
            } else if ((isGrammar = llvm.Grammar.verifyGrammarNoStrict(this.current, this.ast, grammar.CallExpression))) {
                getMiniAst();
                const [object, property, args] = [miniast[0], miniast[2], miniast[miniast.length - 2]].map(t => t?.lexem);
                
                if (object == 'console') {
                    if (property == 'log') {
                        codeGen.genSLFunction('print');
                        let args_t = miniast[miniast.length - 2];
                        codeGen.callFunction('print', args_t.lexem);
                    } else {
                        exception(`${object}.${property}(${args}) is not a function`, miniast[2]);
                    }
                } else {
                    exception(`${object} is not defined`, this.ast[this.current]);
                }

                endIterator();
            } else {
                if (this.ast[this.current].type == 'SPACE') this.current++;
                else exceptionInvalidToken(this.ast[this.current]);
            }
        }

        fs.existsSync('output.bytex') ? fs.rmSync('output.bytex') : fs.writeFileSync('output.bytex', '');
        codeGen.codegen('output');
    }
}

module.exports = Compiler;