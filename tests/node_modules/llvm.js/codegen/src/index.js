const fs = require('fs');
const Token = require('../../llvm/src/token');

class CodeGen {
    static compile = {
        isSegmentVariable: false,
        isSegmentConstant: false,
        isSegmentFunctions: false,

        isMainProgram: false,
        isRoute: false,

        Route: {
            last: null,
            current: null
        },

        headers: {
            segmentHeader: 'segment',
            variable: 'variable',
            constant: 'const',
            main: 'main'
        }, 

        SLFunctions: [],
        consts: [],
        variables: {}
    }


    static #__push__(ast) {
        let new_ast = {
            type: "Program",
            sourcetype: 'main',
            body: [ast]
        }

        if (this.__ast__ == undefined) this.__ast__ = new_ast;
        else this.__ast__.body.push(ast);
    }


    static variableDeclaration(nameToken, valueToken) {
        if ([nameToken instanceof Token, valueToken instanceof Token].includes(false)) {
            console.log(`Invalid Token<T>`);
            process.exit();
        } else {
            this.#__push__({
                type: 'VariableDeclaration',
                kind: 'Variable',
                declarations: {
                    id: nameToken,
                    init: valueToken
                }
            });
        }
    }


    static constDeclaration(nameToken, valueToken) {
        if ([nameToken instanceof Token, valueToken instanceof Token].includes(false)) {
            console.log(`Invalid Token<T>`);
            process.exit();
        } else {
            this.#__push__({
                type: 'VariableDeclaration',
                kind: 'Constant',
                declarations: {
                    id: nameToken,
                    init: valueToken
                }
            });
        }
    }


    static genSLFunction(name) {
        if (name == 'print') {
            this.#__push__({
                type: 'FunctionDeclaration',
                kind: 'Function',
                id: 'print',
                isSLF: true,
                declarations: {
                    body: [
                        'print:',
                        '   push $1',
                        '   call 0x04'
                    ]
                }
            });
        }
    }


    static callFunction(id, args) {
        this.#__push__({
            type: 'CallFunction',
            kind: 'call',
            id,
            arguments: args
        });
    }


    static compileCallFunction(id, args) {
        let ast = [];
        if (typeof args == 'string') ast.push(`    mov $1 ${args}`);

        else if (Array.isArray(args)) {
            for (let index = 0; index < args.length; index++) st.push(`    mov $${index + 1} ${args[index]}`);
        }

        ast.push(`    func ${id}`);
        return ast.join('\n');
    }


    static codegen(filename = 'output-code') {
        let OUTPUT_FILE_PATH = `${filename}.bytex`;
        let outputAST = {};
        let output = {};

        this.__ast__?.body?.forEach((tree) => {
            if (tree?.type == 'VariableDeclaration') {
                if (['Variable', 'Constant'].includes(tree?.kind)) {
                    let name, value;
                    let declaration = tree?.declarations;
                    let isPush = true;
                    
                    if (declaration?.id instanceof Token)
                    if (declaration?.id?.type == 'IDENTIFER') name = declaration?.id?.lexem;
                    
                    if (declaration?.init instanceof Token)
                    if (declaration?.init?.type) value = declaration?.init?.lexem;
                    
                    if ([name, value].every(v => v != null)) {
                        if (this.compile?.[`isSegment${tree?.kind}`] == false) {
                            if (outputAST?.[`segment${tree?.kind}`] == undefined) outputAST[`segment${tree?.kind}`] = [];
                            outputAST?.[`segment${tree?.kind}`].push(`${this.compile.headers.segmentHeader} ${this.compile.headers[tree?.kind?.toLowerCase()]}:`);
                            this.compile[`isSegment${tree?.kind}`] = true;
                        } 

                        if (tree?.kind == 'Constant') {
                            if (!this.compile.consts.includes(name)) {
                                this.compile.consts.push(name);
                            } else {
                                isPush = false;
                            }
                        } else if (tree?.kind == 'Variable') {
                            if (!Reflect.ownKeys(this.compile.variables).includes(name)) {
                                this.compile.variables[name] = outputAST[`segment${tree?.kind}`].length;
                            } else {
                                let item = outputAST[`segment${tree?.kind}`][this.compile.variables[name]];
                                outputAST[`segment${tree?.kind}`][this.compile.variables[name]] = `    ${item.slice(0, item.indexOf(':'))}: ${value}`;
                                isPush = false;
                            }
                        }


                        isPush && outputAST[`segment${tree?.kind}`].push(`    ${name}: ${value}`);
                    }
                }
            } else if (tree?.type == 'FunctionDeclaration') {
                if (tree?.isSLF) {
                    if (this.compile?.isSegmentFunctions == false) {
                        if (outputAST?.segmentFunctions == undefined) outputAST.segmentFunctions = [];
                        this.compile.isSegmentFunctions = true;
                    }

                    if (tree?.kind == 'Function') {
                        if (!this.compile.SLFunctions.includes(tree?.id)) {
                            outputAST.segmentFunctions.push(tree?.declarations.body.join('\n'));
                            this.compile.SLFunctions.push(tree?.id);
                        }
                    }
                }
            } else if (tree?.type == 'CallFunction') {
                if (!this.compile.isRoute) {
                    if (this.compile.isMainProgram == false) {
                        if (outputAST?.main == undefined) outputAST.main = [];
                        outputAST.main.push(`${this.compile.headers.main} code:`);
                        this.compile.isMainProgram = true;
                    }

                    outputAST?.main.push(this.compileCallFunction(tree?.id, tree?.arguments));
                }
            }
        });

        if (outputAST?.segmentVariable) output[0] = outputAST.segmentVariable;
        if (outputAST?.segmentConstant) output[1] = outputAST.segmentConstant;
        if (outputAST?.segmentFunctions) output[2] = outputAST?.segmentFunctions;
        if (outputAST?.main) output[output.length - 1] = outputAST.main;

        for (const section of Reflect.ownKeys(outputAST).sort((a, b) => a - b)) {
            if (!fs.existsSync(OUTPUT_FILE_PATH)) {
                fs.writeFileSync(OUTPUT_FILE_PATH, '');
            }

            let current_content = fs.readFileSync(OUTPUT_FILE_PATH).toString('utf8');
            outputAST[section].push('');
            fs.writeFileSync(OUTPUT_FILE_PATH, `${current_content}\n${outputAST[section].join('\n')}`);
        }
    }
}

module.exports = CodeGen;