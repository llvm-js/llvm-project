class KeyWords {
    static keywords = [];

    static is(keyword) {
        if (typeof keyword === 'string') return this.keywords.includes(keyword);
        return false;
    }

    static put(keyword) {
        if (typeof keyword === 'string') {
            this.keywords.push(keyword);
        } else if (Array.isArray(keyword)) {
            keyword.map(item => typeof item === 'string' && this.keywords.push(item));
        }
    }

    static cut(keyword) {
        if (typeof keyword === 'string') {
            this.keywords.indexOf(keyword) > -1 && delete this.keywords[this.keywords.indexOf(keyword)];
        } else if (Array.isArray(keyword)) {
            keyword.map(item => typeof item === 'string' && this.keywords.indexOf(item) > -1 && delete this.keywords[this.keywords.indexOf(item)]);
        }
    }
}

module.exports = KeyWords;