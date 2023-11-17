class UserToken {
    static userTokens = [];

    static is(lexem) {
        if (typeof lexem === 'string') return this.userTokens.findIndex(token => token?.lexem == lexem) > -1 ? true : false;
        return false;
    }


    static isByIndex(char, index = 0) {
        if (typeof char === 'string') return this.userTokens.findIndex(token => token?.lexem[index] == char) > -1 ? true : false;
        return false;
    }

    static put(token) {
        if (typeof token === 'object' && !Array.isArray(token)) {
            token?.name && token?.lexem && this.userTokens.push(token);
        }
    }

    static get(lexem) {
        if (this.is(lexem)) {
            let tokens = this.userTokens.filter(token => token.lexem == lexem);
            return tokens[tokens.length - 1];
        }
    }

    static cut(name) {
        if (typeof name === 'string') {
            this.userTokens.findIndex(token => token?.name == name) > -1 && delete this.userTokens[this.userTokens.findIndex(token => token?.name == name)];
        } else if (Array.isArray(name)) {
            name.map(item => typeof item === 'string' && this.userTokens.findIndex(token => token?.name == item) > -1 && delete this.userTokens[this.userTokens.findIndex(token => token?.name == item)]);
        }
    }
}

module.exports = UserToken;