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
            llvm.Config.setCommentBlock('/*');

            let file_c = fs.readFileSync(src).toString('utf8').split('\n');
        
            const lexer = new llvm.Lexer();
            let ast = lexer.lexer(file_c);

            let content = lexer.clearComments(ast);
            // console.log(content);
            // console.log(lexer.clearCommentTokens(ast).find(t => ['COMMENT', 'COMMENT_BODY'].includes(t.type))); // undefined
            // console.log(ast.filter(t => t.type == 'COMMENT_BODY'));
            // ast = ast.filter(tree => !['WHITESPACE', 'COMMENT', 'COMMENT_BODY'].includes(tree.type));
            // // console.log(ast);
            ast = new llvm.Lexer().lexer(content.split('\n'));
            ast = ast.filter(tree => !['WHITESPACE'].includes(tree.type));

            console.log(1, ast.find(t => ['PLUS_EQUAL'].includes(t.type)));
            console.log(1, ast.find(t => ['AND'].includes(t.type)));
            // console.log(ast);

            const compiler = new Compiler();
            compiler.run(ast);
            language.run();
        }
    }
}

const language = new Language();

language.run('./lang/test.js');