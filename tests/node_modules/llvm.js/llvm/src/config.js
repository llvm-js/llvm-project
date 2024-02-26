const { PRODUCT_NAME } = require("../../config");

class Config {
    static configVisible = true;
    
    static config = {
        language: {
            name: 'MyLang',
            extension: '.myLang',
            version: 'v1.0.0',
            level: 'high'
        },

        grammar: {
            comment: {
                line: '//',
                block: null,
            },

            keyword: [],
            forbidden: []
        },

        syntax: {
            supportNumberStyleSnakeCase: true,

            supportMultilineStrings: {
                apostrophes: false,
                apostrophe: false
            },

            supportStrings: {
                apostrophe: false
            }
        },

        exception: {
            underscore: '^-'
        }
    }


    static set(object) {
        function setProperty(changeObject, property, object) {
            changeObject[property] = object[property];
        }

        for (const property of Reflect.ownKeys(object)) {
            if (property == 'language') {
                if (typeof object[property] === 'object' && !Array.isArray(object[property])) {
                    for (const prop of Reflect.ownKeys(object[property])) setProperty(this.config.language, prop, object[property]);
                }
            } else {
                console.log(`[${PRODUCT_NAME}][EXCEPTION] Invalid config.property (${property})`);
                process.exit();
            }
        }
    }

    static setSupportNumberSnake(bool) {
        if (typeof bool === 'boolean') this.config.syntax.supportNumberStyleSnakeCase = bool;
    }

    static clearSupportNumberSnake() {
        this.config.syntax.supportNumberStyleSnakeCase = true;
    }

    static setExceptionStyle({ underscore }) {
        if (typeof underscore === 'string') this.config.exception.underscore = underscore;
    }

    static setCommentLine(string) {
        if (typeof string === 'string') this.config.grammar.comment.line = string;
    }


    static setCommentBlock(string) {
        if (typeof string === 'string') this.config.grammar.comment.block = string;
        else if (Array.isArray(string)) {
            if (this.config.grammar.comment.block == null) this.config.grammar.comment.block = [];
            for (const item of string) if (typeof item === 'string') this.config.grammar.comment.block.push(item);
        }
    }


    static setSupportMultilineStrings(config) {
        this.#configuration(this.config.syntax.supportMultilineStrings, config);
    }


    static setSupportStrings(config) {
       this.#configuration(this.config.syntax.supportStrings, config);
    }


    static #configuration(target, config) {
        let keys = Reflect.ownKeys(target);

        if (config instanceof Object) {
            Reflect.ownKeys(config).forEach(key => {
                if (keys.includes(key)) target[key] = config[key];
            });
        } else if (typeof config == 'boolean') {
            keys.forEach(key => target[key] = true);
        }
    }

    
    static clearCommentLine() {
        this.config.grammar.comment.line = null;
    }


    static clearCommentBlock() {
        this.config.grammar.comment.block = null;
    }


    static forbiddenSymbol(char) {
        if (typeof char === 'string') this.config.grammar.forbidden.push(char[0]);
        else if (Array.isArray(char)) this.config.grammar.forbidden.push(...char.map(c => c[0]));
    }
}

module.exports = Config;