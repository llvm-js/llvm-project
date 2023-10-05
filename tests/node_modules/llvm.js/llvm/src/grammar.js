const tokenType = require("./token.type");

class Grammar {
    static arguments = [
        { token: 'OPEN_PAREN' },
        { token: 'IDENTIFER' },

        {
            many: [
                { token: 'COMMA' },
                { token: 'IDENTIFER' },
            ]
        },

        { token: 'CLOSE_PAREN' },
    ]


    static verifyGrammar(current, ast, grammar, strict = true) {
        let step = 0;
        let currentBuckup = current;
        let stepVerify = 0;
        let response = {};

    
        function scanVerifycatorService(obj_t) {
            let key = Reflect.ownKeys(obj_t)[0];
            let verifycator = null;
            if (key == 'keyword') verifycator = keywordType;
            else if (key == 'token') verifycator = tokenType;
            return verifycator;
        }


        function checkTokenVerifycatorService(astToken, verifycator, token) {
            return astToken?.type == verifycator?.get(token);
        }


        function checkTokenType(astToken) {
            return tokenType.get(astToken?.type) ? 'token' : false;
        }


        function walk(obj_t, strict = true) {
            let key = Reflect.ownKeys(obj_t)[0];
            let verifycator = scanVerifycatorService(obj_t);
            
            if (verifycator) {
                if (checkTokenVerifycatorService(ast[current], verifycator, obj_t[key])) {
                    step++;
                    stepVerify++;
                } else {
                   if (strict) Grammar.__reportExceptionToken__(ast[current], key)
                   else return false;
                }
            }

            return true;
        }

        while (current < ast.length) {
            if (ast[current].type != 'SPACE') {
                if (stepVerify == grammar.length) break;

                if (grammar[stepVerify]?.or) {
                    if (Array.isArray(grammar[stepVerify]?.or)) {
                        let bools = [];
                        let verifycator;

                        for (const tokenCkeck of grammar[stepVerify]?.or) {
                            if ((verifycator = scanVerifycatorService(tokenCkeck))) {
                                bools.push(checkTokenVerifycatorService(ast[current], verifycator, tokenCkeck[Reflect.ownKeys(tokenCkeck)[0]]));
                            } else {
                                console.log(`Invalid grammar.property type in ${grammar[stepVerify]} ${Reflect.ownKeys(grammar[stepVerify])}`);
                                process.exit();
                            }
                        }

                        if (bools.indexOf(true) > -1) {
                            step++;
                            stepVerify++;
                        } else {
                            if (strict) Grammar.__reportExceptionToken__(ast[current], checkTokenType(ast[current]));
                            else return false;
                        }
                    }
                } else if (!['token', 'keyword'].includes(Reflect.ownKeys(grammar[stepVerify])[0])) {
                    console.log(`Invalid grammar.property type in ${grammar[stepVerify]} ${Reflect.ownKeys(grammar[stepVerify])}`);
                    process.exit();
                } else {
                   let w = walk(grammar[stepVerify], strict);

                    if (!w) {
                       if (strict) Grammar.__reportExceptionToken__(ast[current], checkTokenType(ast[current]));
                       else return false;
                    }
                }
            }

            current++;
        }

        response.steps = step;
        response.sliceSize = [currentBuckup, current];
        return response;
    }


    static verifyGrammarNoStrict(curernt, ast, grammar) {
        return this.verifyGrammar(curernt, ast, grammar, false);
    }


    static __reportExceptionToken__(token_t, type) {
        console.log(`[${token_t.line}:${token_t.current}] Invalid command "${token_t.lexem}"`);
        console.log(`${token_t.line} | ${token_t.code}`);

        if (['token', 'keyword'].includes(type)) {
            let current = token_t.current - token_t?.lexem?.length;
            console.log(`${' '.repeat(String(token_t.line).length)} | ${' '.repeat(current)}^${'-'.repeat(token_t.lexem.length - 1)}`);
        } else {
            console.log(`${' '.repeat(String(token_t.line).length)} | ${' '.repeat(token_t.current)}^${'-'.repeat(token_t.lexem.length - 1)}`);
        }

        process.exit(1);
    }
}

module.exports = Grammar;