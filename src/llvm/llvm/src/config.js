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
            },

            keyword: [],
            forbidden: []
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


    static setCommentLine(string) {
        if (typeof string === 'string') this.config.grammar.comment.line = string;
    }


    static forbiddenSymbol(char) {
        if (typeof char === 'string') this.config.grammar.forbidden.push(char[0]);
        else if (Array.isArray(char)) this.config.grammar.forbidden.push(...char.map(c => c[0]));
    }
}

module.exports = Config;