const fs = require('fs');
const llvm = require('llvm.js/llvm');
const Compiler = require('./compiler');

class Language {
    run(src) {
        if (fs.existsSync(src)) {
            llvm.Config.setCommentBlock('/*');
            llvm.Config.setExceptionStyle({ underscore: '^~' });

            llvm.Config.setSupportStrings({ apostrophe: true });
            llvm.Config.setSupportMultilineStrings({ apostrophe: true });

            let ast = new llvm.Lexer().lexer(fs.readFileSync(src).toString('utf8').split('\n'), src);
            ast = ast.filter(tree => !['WHITESPACE', 'COMMENT', 'COMMENT_BODY'].includes(tree.type));
            const compiler = new Compiler();
            compiler.run(ast);
        }
    }
}

const language = new Language();

language.run('./lang/test.js');