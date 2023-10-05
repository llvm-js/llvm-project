const fs = require('fs');

const llvm = require('llvm.js/llvm');
const Expression = require('llvm.js/expression');
const Compiler = require('./compiler');

let expression = new Expression('2 + 4');
console.log(expression.answer());

class Language {
    run(src) {
        if (fs.existsSync(src)) {
            const language = new llvm.llvm();

            llvm.Config.set({
                language: {
                    name: 'JavaScript',
                    extension: 'js',
                    level: 'high'
                }
            });

            llvm.Config.setCommentLine('//');
            let file_c = fs.readFileSync(src).toString('utf8').split('\n');
        
            const lexer = new llvm.Lexer();
            let ast = lexer.lexer(file_c);
            ast = ast.filter(tree => !['WHITESPACE', 'COMMENT'].includes(tree.type));
            // console.log(ast);

            const compiler = new Compiler();
            compiler.run(ast);
            language.run();
        }
    }
}

const language = new Language();

language.run('./lang/test.js');