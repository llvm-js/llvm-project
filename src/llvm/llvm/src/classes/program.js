class Program {
    constructor({ type, sourcetype, loc, body }) {
        this.type = type;
        if(sourcetype) this.sourcetype = sourcetype;
        this.loc = loc;
        this.body = body;
    }
}

module.exports = Program;