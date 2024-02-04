class Expression {
    constructor({ type, start, end, body }) {
        this.type = type;
        this.start = start;
        this.end = end;
        this.body = body;
    }
}


module.exports = Expression;