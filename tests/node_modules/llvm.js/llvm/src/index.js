const { PRODUCT_NAME, PRODUCT_ID, PRODUCT_REPOSITORY, PRODUCCT_RELEASE } = require("../../config");
const Config = require("./config");
const Grammar = require("./grammar");
const Lexer = require("./lexer");
const tokenType = require("./token.type");


class llvm {
    configVisible(boolean) {
        Config.configVisible = Boolean(boolean);
    }


    getConfig() {
        return Config.config;
    }


    run() {
        if (Config.configVisible) {
            console.log(`Run language (${PRODUCT_NAME} ${PRODUCCT_RELEASE})[ID:${PRODUCT_ID}](github: ${PRODUCT_REPOSITORY})`);
            for (const config_t of Reflect.ownKeys(Config.config.language)) console.log(`${config_t}: ${Config.config.language[config_t]}`);
        }
    }


    repl(cb) {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdout.write(`>>> `);
        process.stdin.resume();

        process.stdin.on('data', function (data) {
            if (cb(data) == true) process.exit();
            process.stdout.write(`>>> `);
        });
    }
}

module.exports = { llvm, Config, Lexer, Grammar, tokenType };