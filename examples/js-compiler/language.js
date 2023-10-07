const fs = require('fs');
const llvm = require('llvm.js/llvm');
const Compiler = require('./compiler');

class Language {
    run(src) {
        if (fs.existsSync(src)) {
            let ast = new llvm.Lexer().lexer(fs.readFileSync(src).toString('utf8').split('\n'));
            ast = ast.filter(tree => !['WHITESPACE', 'COMMENT'].includes(tree.type));
            const compiler = new Compiler();
            compiler.run(ast);
        }
    }
}

const language = new Language();

language.run('./lang/test.js');